class ProductCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Parse product data
    this.product = this.product || JSON.parse(this.getAttribute("product"));

    if (window.app?.status === "ready") {
      this.onReady();
    } else {
      document.addEventListener("theme::ready", () => this.onReady());
    }
  }

  onReady() {
    this.fitImageHeight = salla.config.get("store.settings.product.fit_type");
    salla.wishlist.event.onAdded((event, id) => this.toggleFavoriteIcon(id));
    salla.wishlist.event.onRemoved((event, id) =>
      this.toggleFavoriteIcon(id, false)
    );
    this.placeholder = salla.url.asset(
      salla.config.get("theme.settings.placeholder")
    );
    this.getProps();

    // Get page slug
    this.source = salla.config.get("page.slug");

    // If the card is in the landing page, hide the add button and show the quantity
    if (this.source == "landing-page") {
      this.hideAddBtn = true;
      this.showQuantity = true;
    }

    salla.lang.onLoaded(() => {
      // Language
      this.remained = salla.lang.get("pages.products.remained");
      this.donationAmount = salla.lang.get("pages.products.donation_amount");
      this.startingPrice = salla.lang.get("pages.products.starting_price");
      this.addToCart = salla.lang.get("pages.cart.add_to_cart");
      this.outOfStock = salla.lang.get("pages.products.out_of_stock");

      // re-render to update translations
      this.render();
    });

    this.render();
  }

  initCircleBar() {
    let qty = this.product.quantity,
      total = this.product.quantity > 100 ? this.product.quantity * 2 : 100,
      roundPercent = (qty / total) * 100,
      bar = this.querySelector(".s-product-card-content-pie-svg-bar"),
      strokeDashOffsetValue = 100 - roundPercent;
    bar.style.strokeDashoffset = strokeDashOffsetValue;
  }

  toggleFavoriteIcon(id, isAdded = true) {
    document
      .querySelectorAll('.s-product-card-wishlist-btn[data-id="' + id + '"]')
      .forEach((btn) => {
        app.toggleElementClassIf(
          btn,
          "s-product-card-wishlist-added",
          "not-added",
          () => isAdded
        );
        app.toggleElementClassIf(
          btn,
          "pulse-anime",
          "un-favorited",
          () => isAdded
        );
      });
  }

  formatDate(date) {
    let d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  getProductBadge() {
    if (this.product.promotion_title) {
      return `<div class="s-product-card-promotion-title">${this.product.promotion_title}</div>`;
    }
    if (this.showQuantity && this.product?.quantity) {
      return `<div
          class="s-product-card-quantity">${
            this.remained
          } ${salla.helpers.number(this.product?.quantity)}</div>`;
    }
    if (this.showQuantity && this.product?.is_out_of_stock) {
      return `<div class="s-product-card-out-badge">${this.outOfStock}</div>`;
    }
    return "";
  }

  getPriceFormat(price) {
    if (!price || price == 0) {
      return salla.config.get("store.settings.product.show_price_as_dash")
        ? "-"
        : "";
    }

    return salla.money(price);
  }

  getProductPrice() {
    let price = "";
    if (this.product.is_on_sale) {
      price = `<div class="">
                  <h4>${this.getPriceFormat(this.product.sale_price)}</h4>
               
                </div>`;
    } else if (this.product.starting_price) {
      price = `<div class="s-product-card-starting-price">
                    <p>${this.startingPrice}</p>
                    <h4> ${this.getPriceFormat(
                      this.product?.starting_price
                    )} </h4>
                </div>`;
    } else {
      price = `<h4 class="s-product-card-price">${this.getPriceFormat(
        this.product?.price
      )}</h4>`;
    }

    return price;
  }

  getAddButtonLabel() {
    if (this.product.status === "sale" && this.product.type === "booking") {
      return salla.lang.get("pages.cart.book_now");
    }

    if (this.product.status === "sale") {
      return salla.lang.get("pages.cart.add_to_cart");
    }

    if (this.product.type !== "donating") {
      return salla.lang.get("pages.products.out_of_stock");
    }

    // donating
    return salla.lang.get("pages.products.donation_exceed");
  }

  getProps() {
    /**
     *  Horizontal card.
     */
    this.horizontal = this.hasAttribute("horizontal");

    /**
     *  Support shadow on hover.
     */
    this.shadowOnHover = this.hasAttribute("shadowOnHover");

    /**
     *  Hide add to cart button.
     */
    this.hideAddBtn = this.hasAttribute("hideAddBtn");

    /**
     *  Full image card.
     */
    this.fullImage = this.hasAttribute("fullImage");

    /**
     *  Minimal card.
     */
    this.minimal = this.hasAttribute("minimal");

    /**
     *  Special card.
     */
    this.isSpecial = this.hasAttribute("isSpecial");

    /**
     *  Show quantity.
     */
    this.showQuantity = this.hasAttribute("showQuantity");
  }

  render() {
    this.classList.add("s-product-card-entry");
    this.setAttribute("id", this.product.id);
    !this.horizontal && !this.fullImage && !this.minimal
      ? this.classList.add("s-product-card-vertical")
      : "";
    this.horizontal && !this.fullImage && !this.minimal
      ? this.classList.add("s-product-card-horizontal")
      : "";
    this.fitImageHeight && !this.isSpecial && !this.fullImage && !this.minimal
      ? this.classList.add("s-product-card-fit-height")
      : "";
    this.isSpecial ? this.classList.add("s-product-card-special") : "";
    this.fullImage ? this.classList.add("s-product-card-full-image") : "";
    this.minimal ? this.classList.add("s-product-card-minimal") : "";
    this.product?.donation ? this.classList.add("s-product-card-donation") : "";
    this.shadowOnHover ? this.classList.add("s-product-card-shadow") : "";
    this.product?.is_out_of_stock
      ? this.classList.add("s-product-card-out-of-stock")
      : "";

    this.innerHTML = `
        <div class="relative flex flex-col justify-center items-center p-4" style="background-color: transparent">
        <div class=" absolute flex flex-col " style=" top:10px ;right:5px ;z-index:44  ">
         
        <div class="wishlist" data-title="إضافة للسلة">
        <salla-button onclick="salla.wishlist.toggle(${
          this.product.id
        })" shape="icon" fill="outline" color="primary" aria-label="wishlist button" class=" s-button-wrap hydrated">
          <svg xmlns="http://www.w3.org/2000/svg" width="47" height="48" viewBox="0 0 47 48" fill="none">
          <path d="M23.1506 42.4608L20.3714 39.8758C10.5006 30.7304 3.98389 24.6987 3.98389 17.2962C3.98389 11.2646 8.62222 6.52539 14.5256 6.52539C17.8606 6.52539 21.0614 8.11164 23.1506 10.6183C25.2397 8.11164 28.4406 6.52539 31.7756 6.52539C37.6789 6.52539 42.3172 11.2646 42.3172 17.2962C42.3172 24.6987 35.8006 30.7304 25.9297 39.8954L23.1506 42.4608Z" fill="#212121"/>
          </svg>
        </salla-button>
      </div>
        <div class="quickview-btn eye-icon flex justify-center items-center" onclick="clickModal(${
          this.product.id
        })" data-title="عرض سريع" data-product-id="${this.product.id}">
                      <salla-button  fill="outline"  class="s-button-wrap hydrated " shape="btn" color="primary" size="medium" width="normal">

                      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
                      <path d="M21.6507 8.90039C12.6924 8.90039 5.04197 14.6021 1.94238 22.6504C5.04197 30.6987 12.6924 36.4004 21.6507 36.4004C30.6091 36.4004 38.2595 30.6987 41.3591 22.6504C38.2595 14.6021 30.6091 8.90039 21.6507 8.90039ZM21.6507 31.8171C16.7057 31.8171 12.6924 27.7104 12.6924 22.6504C12.6924 17.5904 16.7057 13.4837 21.6507 13.4837C26.5957 13.4837 30.6091 17.5904 30.6091 22.6504C30.6091 27.7104 26.5957 31.8171 21.6507 31.8171ZM21.6507 17.1504C18.6765 17.1504 16.2757 19.6071 16.2757 22.6504C16.2757 25.6937 18.6765 28.1504 21.6507 28.1504C24.6249 28.1504 27.0257 25.6937 27.0257 22.6504C27.0257 19.6071 24.6249 17.1504 21.6507 17.1504Z" fill="#212121"/>
                      </svg>

                      </salla-button>
                  </div>
        </div>
    <div class=" flex justify-center items-center">
        <a href="${this.product?.url}">
          <img class="s-product-card-image-${
            salla.url.is_placeholder(this.product?.image?.url)
              ? "contain"
              : this.fitImageHeight
              ? this.fitImageHeight
              : "cover"
          } lazy "
            src=${this.placeholder}
            alt=${this.product?.image?.alt}
            data-src=${this.product?.image?.url || this.product?.thumbnail}
            style="height: 150px; width: 130px"
          />
          ${!this.fullImage && !this.minimal ? this.getProductBadge() : ""}
        </a>
        ${
          this.fullImage
            ? `<a href="${this.product?.url}" class="s-product-card-overlay"></a>`
            : ""
        }
        
      </div>
      <div>
    </div>
    ${
      !this.hideAddBtn
        ? `<div class="s-product-card-content-footer gap-2">
          <salla-add-product-button fill="outline" width="wide"
            product-id="${this.product.id}"
            product-status="${this.product.status}"
            product-type="${this.product.type}">
           
            ${
              this.product.add_to_cart_label
                ? this.product.add_to_cart_label
                : this.getAddButtonLabel()
            }
          </salla-add-product-button>

          ${
            this.horizontal || this.fullImage
              ? `<salla-button 
              shape="icon" 
              fill="outline" 
              color="light" 
              id="card-wishlist-btn-${this.product.id}-horizontal"
              aria-label="Add or remove to wishlist"
              class="s-product-card-wishlist-btn animated"
              onclick="salla.wishlist.toggle(${this.product.id})"
              data-id="${this.product.id}">
              <i class="sicon-heart"></i> 
            </salla-button>`
              : ``
          }
        </div>`
        : ``
    }

        <div class="s-product-card-content-main ${
          this.isSpecial ? "s-product-card-content-extra-padding" : ""
        }">
            <h3 class="s-product-card-content-title">
              <a href="${this.product?.url}">${this.product?.name}</a>
            </h3>

            ${
              this.product?.subtitle && !this.minimal
                ? `<p class="s-product-card-content-subtitle">${this.product?.subtitle}</p>`
                : ``
            }
          </div>
          <div class="s-product-card-content-sub ${
            this.isSpecial ? "s-product-card-content-extra-padding" : ""
          } flex justify-center items-center" style="justify-content : center !important ; margin:0px !important">
          ${
            this.product?.rating?.stars && !this.minimal
              ? `<div class="s-product-card-rating">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M10.9577 2.47119C6.05909 2.47119 2.09229 6.26095 2.09229 10.9305C2.09229 15.6 6.05909 19.3898 10.9577 19.3898C15.8652 19.3898 19.8409 15.6 19.8409 10.9305C19.8409 6.26095 15.8652 2.47119 10.9577 2.47119ZM14.7204 16.0061L10.9666 13.8489L7.21275 16.0061L8.20667 11.9371L4.89656 9.20479L9.26271 8.8495L10.9666 5.00898L12.6704 8.84104L17.0366 9.19633L13.7265 11.9287L14.7204 16.0061Z" fill="#FFAC0D"/>
          </svg>
            </div>`
              : ``
          }
          ${this.getProductPrice()}
            
          </div>
    </div>
        `;

    // re-init favorite icon
    if (!salla.config.isGuest()) {
      salla.storage
        .get("salla::wishlist", [])
        .forEach((id) => this.toggleFavoriteIcon(id));
    }

    document.lazyLoadInstance?.update(this.querySelectorAll(".lazy"));

    if (this.product?.quantity && this.isSpecial) {
      this.initCircleBar();
    }
  }
}

customElements.define("custom-salla-product-card", ProductCard);
