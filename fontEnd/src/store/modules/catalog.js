// 目录,通过快照式实现撤销与重做
export default {
  namespaced: true,
  state: {
    cursor: -1,
    stackCatalog: [],
    stackName: []
  },
  mutations: {
    init(state) {
      state.cursor = -1
      state.stackCatalog = []
      state.stackName = []
    },
    setRoot(state, catalogId) {
      state.cursor = 0
      state.stackCatalog.push(catalogId)
      state.stackName.push('根目录')
    },
    record(state, [catalogId, catalogName]) {
      while(state.cursor < state.stackCatalog.length - 1) {
        state.stackCatalog.pop()
        state.stackName.pop()
      }
      state.stackCatalog.push(catalogId)
      state.stackName.push(catalogName)
      state.cursor += 1
    },
    redo(state) {
      if(state.cursor < state.stackCatalog.length - 1)
        state.cursor += 1
    },
    undo(state) {
      if(state.cursor > 0) 
        state.cursor -= 1
    }
  },
  getters: {
    getCatalogId(state) {
      return state.stackCatalog[state.cursor]
    },
    getCatalogName(state) {
      return state.stackName[state.cursor]
    }
  }
}
