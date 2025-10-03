import { defineStore } from 'pinia'

 const useMenuStore = defineStore('menu', {
    state: () => ({
        tagList: [] as any[],
        isCollapse:false
    }),
    getters: {
        getCollapse:(state)=>{
            return state.isCollapse;
        }
    },
    actions: {
        setTagList(tag:any) {
            const isExist = this.tagList.find(item=> item.path === tag.path);
            if (!isExist) {
                this.tagList.push(tag);
            }
        },
        setCollapse(){
            this.isCollapse=!this.isCollapse;
    },
    
},
     persist:{
         key: 'user-store',
         storage: sessionStorage  // 设置保存在SessionStorage中，默认是保存在localStorage
     }
})

export default useMenuStore;