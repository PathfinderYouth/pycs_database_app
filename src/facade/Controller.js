export default class Controller {
  constructor(ref, filter, sorter, limit, onChildNext, onDirecting, onError) {
    this._query = this._buildQuery(ref, filter, sorter);

    this._checkPoints = [];
    this._limit = limit;
    this._currentPage = 0;
    this._onDirecting = onDirecting;

    this._observer = {
      next: querySnap => {
        let firstSnap = querySnap.docs[0];
        let lastSnap = querySnap.docs[querySnap.docs.length - 1];

        this._checkPoints[this._currentPage] = firstSnap;
        this._checkPoints[this._currentPage + 1] = lastSnap;

        querySnap.docChanges().forEach(docChg => {
          let doc = docChg.doc.data();
          doc.id = docChg.doc.id;
          onChildNext(doc, docChg.newIndex, docChg.oldIndex, docChg.type);
        });
      },
      error: onError,
    };

    this._unsubStart = this._query.limit(1).onSnapshot({
      next: querySnap => {
        if (querySnap.docs.length > 0) {
          this.startId = querySnap.docs[0].id;
        }
      },
      error: onError,
    });

    this._unsubEnd = this._query.limitToLast(1).onSnapshot({
      next: querySnap => {
        if (querySnap.docs.length > 0) {
          this.endId = querySnap.docs[0].id;
        }
      },
      error: onError,
    });

    this._unsubContent = this._query.limit(limit).onSnapshot(this._observer);

    this.startId = null;
    this.endId = null;
  }

  _buildQuery(ref, filter, sorter) {
    if (!filter) {
      // Default filter: none
      filter = {};
    }

    const { status, ...temp } = filter;
    if (status) {
      ref = ref.where('status', '==', status);
    }

    for (const field in temp) {
      if (temp[field]) {
        // TODO: startsWith
        ref = ref.where(field, '==', temp[field]);
      }
    }

    if (!sorter || Object.keys(sorter).length === 0) {
      // Default sorter: createdAt
      sorter = { createdAt: 'asc' };
    }

    for (const field in sorter) {
      ref = ref.orderBy(field, sorter[field] ? sorter[field] : undefined);
    }
    return ref;
  }

  unsubcribe() {
    this._unsubStart();
    this._unsubEnd();
    this._unsubContent();
  }

  prevPage() {
    // You're at the fist page. Cannot go back anymore.
    if (this._currentPage === 0) {
      return;
    }

    let query = this._query;
    if (--this._currentPage !== 0) {
      query = query.startAt(this._checkPoints[this._currentPage]);
    }

    this._unsubContent();
    if (this._onDirecting) {
      this._onDirecting();
    }
    this._unsubContent = query.limit(this._limit).onSnapshot(this._observer);
  }

  nextPage() {
    // You're at the last page. Cannot go forward anymore.
    if (this.endId === this._checkPoints[this._currentPage + 1].id) {
      return;
    }

    let query = this._query;
    query = query.startAfter(this._checkPoints[++this._currentPage]);

    this._unsubContent();
    if (this._onDirecting) {
      this._onDirecting();
    }
    this._unsubContent = query.limit(this._limit).onSnapshot(this._observer);
  }
}
