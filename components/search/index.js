import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'
import { paginationBev } from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  // 行为
  behaviors: [paginationBev],

  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false
  },

  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then(resp => {
      this.setData({
        hotWords: resp.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel() {
      this.triggerEvent('cancel', {}, {})
      this.initialize()
    },

    onDelete() {
      this._closeResult()
      this.initialize()

      this.setData({
        historyWords: keywordModel.getHistory()
      })
    },

    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      const q = event.detail.value || event.detail.text
      bookModel.search(0, q).then(resp => {
        this.setMoreData(resp.books)
        this.setTotal(resp.total)
        this.setData({
          q
        })
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },

    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q).then(
          resp => {
            this.setMoreData(resp.books)
            this.unlocked()
          },
          () => {
            this.unlocked()
          }
        )
      }
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q:''
      })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    }
  }
})
