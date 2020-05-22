/**
 * This class is used to simplify the pagination query to Firestore.
 */
export default class Controller {
  constructor(query, limit, onChildNext, setLoading, onError) {
    this._query = query;

    // This is an array used for storing the first document and last documents of each page.
    // It makes the process of paging through the collection possible using Firestore.
    this._checkPoints = [];

    this._limit = limit;
    this._currentPage = 0;

    // Event handler/listener object to handle with real-time changes
    this._observer = {
      next: (querySnap) => {
        let firstSnap = querySnap.docs[0];
        let lastSnap = querySnap.docs[querySnap.docs.length - 1];

        // Update first and last documents of the current page
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
          if (setLoading) {
            setLoading(false);
          }
        }
      },
      error: onError,
    };

    this._unsubEnd = this._subscribeToEnd();
    this._unsubContent = this._query.limit(limit).onSnapshot(this._observer);

    // This is used for keeping track of the last document of a query, which helps determine if
    // we're on the last page or not.
    this.endId = null;
  }

  /**
   * Private helper method for subscribing to real-time changes on the last document of the query.
   */
  _subscribeToEnd() {
    return this._query.limitToLast(1).onSnapshot({
      next: (querySnap) => {
        if (querySnap.docs.length > 0) {
          this.endId = querySnap.docs[0].id;
        }
      },
    });
  }

  /**
   * Unsubscribe all real-time listeners for the query.
   */
  unsubscribe() {
    this._unsubEnd();
    this._unsubContent();
  }

  /**
   * Go to the previous page.
   * @param {onDirecting: () => void}
   *  Callback function when about to go to the previous page
   */
  back(onDirecting) {
    // You're at the first page. Cannot go back anymore.
    if (this._currentPage === 0) {
      return;
    }

    // Get the first document of the previous page so the query knows where to start from
    let query = this._query;
    if (--this._currentPage !== 0) {
      query = query.startAt(this._checkPoints[this._currentPage]);
    }

    // Unsubscribe previous listeners and start a new query
    this.unsubscribe();
    if (onDirecting) {
      onDirecting();
    }
    this._unsubEnd = this._subscribeToEnd();
    this._unsubContent = query.limit(this._limit).onSnapshot(this._observer);
  }

  /**
   * Go to the next page.
   * @param {onDirecting: () => void}
   *  Callback function when about to go to the next page
   */
  next(onDirecting) {
    // You're at the last page. Cannot go forward anymore.
    if (this.endId === this._checkPoints[this._currentPage + 1].id) {
      return;
    }

    // Get the last document of the current page so the query knows where to start from
    let query = this._query;
    query = query.startAfter(this._checkPoints[++this._currentPage]);

    // Unsubscribe previous listeners and start a new query
    this.unsubscribe();
    if (onDirecting) {
      onDirecting();
    }
    this._unsubEnd = this._subscribeToEnd();
    this._unsubContent = query.limit(this._limit).onSnapshot(this._observer);
  }
}
