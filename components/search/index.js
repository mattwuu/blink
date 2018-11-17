import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    q:''
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
    },

    onDelete() {
      this.setData({
        searching: false
      })
    },

    onConfirm(event) {
      this.setData({
        searching: true
      })
      const q = event.detail.value || event.detail.text
      bookModel.search(0, q).then(resp => {
        this.setData({
          dataArray: resp.books,
          q
        })
        keywordModel.addToHistory(q)
      })
    }
  }
})
