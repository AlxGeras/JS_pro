const sidebar = {
    data(){
      return {
          showSideBar: false,
      }
    },
    
    template: `
    <nav class="header-sidebar-menu" v-if="showSideBar">
    <button class="header-sidebar-menu__close-btn" @click = "showSideBar=false">
        <i class="header-sidebar-menu__close-btn-fa fas fa-times"></i>
    </button>
    <p class="header-sidebar-menu__menu-name">
        MENU
    </p>
    <ul class="header-sidebar-menu__main-list">
        <li class="header-sidebar-menu__category">
            MAN
            <ul class="header-sidebar-menu__category-list">
                <li class="header-sidebar-menu__category-item">
                    <a href="#" class="header-sidebar-menu__category-item-link">
                        Accessories
                    </a>
                </li>
                <li class="header-sidebar-menu__category-item">
                    <a href="#" class="header-sidebar-menu__category-item-link">
                        Bags
                    </a>
                </li>
                <li class="header-sidebar-menu__category-item">
                    <a href="#" class="header-sidebar-menu__category-item-link">
                        Denim
                    </a>
                </li>
                <li class="header-sidebar-menu__category-item">
                    <a href="#" class="header-sidebar-menu__category-item-link">
                        T-Shirts
                    </a>
                </li>
            </ul>
        </li>
        <li class="header-sidebar-menu__category">
            WOMAN
            <ul class="header-sidebar-menu__category-list">
                <li class="header-sidebar-menu__category-item">
                    <a href="#" class="header-sidebar-menu__category-item-link">
                        Accessories
                    </a>
                </li>
                <li class="header-sidebar-menu__category-item">
                    <a href="#" class="header-sidebar-menu__category-item-link">
                        Jackets & Coats
                    </a>
                </li>
                <li class="header-sidebar-menu__category-item">
                    <a href="#" class="header-sidebar-menu__category-item-link">
                        Polos
                    </a>
                </li>
                <li class="header-sidebar-menu__category-item">
                    <a href="#" class="header-sidebar-menu__category-item-link">
                        T-Shirts
                    </a>
                </li>
                <li class="header-sidebar-menu__category-item">
                    <a href="#" class="header-sidebar-menu__category-item-link">
                        Shirts
                    </a>
                </li>
            </ul>
        </li>
        <li class="header-sidebar-menu__category">
            KIDS
            <ul class="header-sidebar-menu__category-list">
                <li class="header-sidebar-menu__category-item">
                    <a href="#" class="header-sidebar-menu__category-item-link">
                        Accessories
                    </a>
                </li>
                <li class="header-sidebar-menu__category-item">
                    <a href="#" class="header-sidebar-menu__category-item-link">
                        Jackets & Coats
                    </a>
                </li>
                <li class="header-sidebar-menu__category-item">
                    <a href="#" class="header-sidebar-menu__category-item-link">
                        Polos
                    </a>
                </li>
                <li class="header-sidebar-menu__category-item">
                    <a href="#" class="header-sidebar-menu__category-item-link">
                        T-Shirts
                    </a>
                </li>
                <li class="header-sidebar-menu__category-item">
                    <a href="#" class="header-sidebar-menu__category-item-link">
                        Shirts
                    </a>

                </li>
                <li class="header-sidebar-menu__category-item">
                    <a href="#" class="header-sidebar-menu__category-item-link">
                        Bags
                    </a>
                </li>
            </ul>
        </li>
    </ul>
</nav>`
};


export default sidebar;