
Vue.component('error', {
    data(){
      return {
        errorData: false,
      }
    },
    mounted(){
    },
    template: `  
            <transition name="modal" v-if="errorData">
            <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                <div class="modal-body">
                    <slot name="body">
                    Не удаётся выполнить запрос к серверу.
                    </slot>
                </div>
                    <button class="modal-default-button" @click="errorData = false">
                        OK
                    </button>
                </div>
            </div>
            </div>
        </transition>
    `
});
