export default class Controller {
  constructor(query, limit, onChildNext, setLoading, onError) {
    this._query = query;

    this._checkPoints = [];
    this._limit = limit;
    this._currentPage = 0;

    this._observer = {
      next: (querySnap) => {
        let firstSnap = querySnap.docs[0];
        let lastSnap = querySnap.docs[querySnap.docs.length - 1];

        this._checkPoints[this._currentPage] = firstSnap;
        this._checkPoints[this._currentPage + 1] = lastSnap;

        let changes = querySnap.docChanges();
        if (changes.length > 0) {
          changes.forEach((docChg) => {
            let doc = docChg.doc.data();
            doc.id = docChg.doc.id;
            onChildNext(doc, docChg.newIndex, docChg.oldIndex, docChg.type);
          });
        } else {
          setLoading(false)
        }
      },
      error: onError,
    };

    this._unsubEnd = this._subscribeToEnd();
    this._unsubContent = this._query.limit(limit).onSnapshot(this._observer);

    this.endId = null;
  }

  _subscribeToEnd() {
    return this._query.limitToLast(1).onSnapshot({
      next: (querySnap) => {
        if (querySnap.docs.length > 0) {
          this.endId = querySnap.docs[0].id;
        }
      },
    });
  }

  unsubscribe() {
    this._unsubEnd();
    this._unsubContent();
  }

  back(onDirecting) {
    // You're at the first page. Cannot go back anymore.
    if (this._currentPage === 0) {
      return;
    }

    let query = this._query;
    if (--this._currentPage !== 0) {
      query = query.startAt(this._checkPoints[this._currentPage]);
    }

    this.unsubscribe();
    if (onDirecting) {
      onDirecting();
    }
    this._unsubEnd = this._subscribeToEnd();
    this._unsubContent = query.limit(this._limit).onSnapshot(this._observer);
  }

  next(onDirecting) {
    // You're at the last page. Cannot go forward anymore.
    if (this.endId === this._checkPoints[this._currentPage + 1].id) {
      return;
    }

    let query = this._query;
    query = query.startAfter(this._checkPoints[++this._currentPage]);

    this.unsubscribe();
    if (onDirecting) {
      onDirecting();
    }
    this._unsubEnd = this._subscribeToEnd();
    this._unsubContent = query.limit(this._limit).onSnapshot(this._observer);
  }
}
