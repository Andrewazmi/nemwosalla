import MobileMenu from "mmenu-light";
import Swal from "sweetalert2";
import Anime from "./partials/anime";
import initTootTip from "./partials/tooltip";
import AppHelpers from "./app-helpers";

import { DateTime } from "luxon";

class App extends AppHelpers {
  constructor() {
    super();
    window.app = this;
  }

  loadTheApp() {
    this.doneSubscribe();
    this.featureProductSlider();
    this.handleDropdown();
    this.scrollToTop();
    this.timeStamp();
    this.productBelongThree();
    this.navLinks();
    this.prodBelongToCat();
    this.productCategory();
    this.map();
    this.getAllCategory();
    this.elanSldier();
    this.commonThings();
    this.removeElan();
    this.initiateNotifier();
    this.initiateMobileMenu();
    // this.toggleProductFilterMenu();
    this.getProductsWithLimitedOffers();
    if (header_is_sticky) {
      this.initiateStickyMenu();
    }
    this.initAddToCart();
    this.initiateAdAlert();
    this.initiateDropdowns();
    this.initiateModals();
    this.initiateCollapse();
    initTootTip();
    this.loadModalImgOnclick();

    salla.comment.event.onAdded(() => window.location.reload());

    this.status = "ready";
    document.dispatchEvent(new CustomEvent("theme::ready"));
    this.log("Theme Loaded 🎉");
  }

  log(message) {
    salla.log(`ThemeApp(Raed)::${message}`);
    return this;
  }

  doneSubscribe() {
    const subscribeBtn = document.getElementById("subscribe-btn");
    const subscribeAlert = document.getElementById("subscribe-alert");
    subscribeBtn.addEventListener("click", () => {
      subscribeAlert.classList.add("done");
      setTimeout(() => {
        subscribeAlert.classList.remove("done");
      }, 5000);
    });
  }

  handleDropdown() {
    const dropdownButton = document.getElementById("dropdownButton");
    const dropdownMenu = document.getElementById("dropdownMenu");
    dropdownButton.addEventListener("click", () => {
      dropdownMenu.classList.toggle("show");
    });
  }

  //// feature product slider
  async featureProductSlider() {
    const insert = document.getElementById("slider-feature-product");
    const productsIDs = Array.from(
      document.getElementsByClassName("feature-product-slider")
    ).map((v) => +v.innerHTML.trim());
    const products = [];
    for (let i = 0; i < productsIDs.length; i++) {
      const response = await salla.product.getDetails(productsIDs[i], [
        "images",
        "sold_quantity",
        "category",
      ]);

      const product = response.data;
      console.log({ productTest: product });
      const images = product.images.map((img) => img.url);
      products.push({
        images,
        name: product.name,
        discount:
          product.sale_price < product.regular_price
            ? Math.floor((product.price / product.regular_price) * 100)
            : "",
        priceDiscount:
          product.sale_price < product.regular_price
            ? product.regular_price
            : "",
        price: product.price,
        id: product.id,
        name: product.name,
        url: product.url,
      });
    }

    let datas = ``;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      let images = ``;

      let thumbs = ``;
      product.images.map((e) => {
        const dataImage = `<div style="height: 200px">
      <img
        class="object-contain w-full h-full"
        src="${e}"
        alt="product"
      /></div>`;
        const div = `
      <div class=" rounded-full" style="background-color: #334155 ; height : 20px"></div>
      `;
        thumbs += div;
        images += dataImage;
      });

      const data = `
      <div  class="flex flex-col items-center  bg-[#F1EBEB] rounded-xl p-4 relative mx-5" style="width : 250px">
      ${product.discount &&
        `<div class="absolute top-4 left-4 z-10 w-[50px] h-[50px] bg-[#FFAC0D] text-white rounded-full flex justify-center items-center">
          <span>${product.discount}%</span>
        </div>`
        }
      <div class="absolute top-4 right-4 flex flex-col gap-1 z-10">
      <div class="wishlist" data-title="إضافة للسلة">
      <salla-button onclick="salla.wishlist.toggle(${product.id
        })" shape="icon" fill="outline" color="primary" aria-label="wishlist button" class=" s-button-wrap hydrated">
        <svg xmlns="http://www.w3.org/2000/svg" width="47" height="48" viewBox="0 0 47 48" fill="none">
        <path d="M23.1506 42.4608L20.3714 39.8758C10.5006 30.7304 3.98389 24.6987 3.98389 17.2962C3.98389 11.2646 8.62222 6.52539 14.5256 6.52539C17.8606 6.52539 21.0614 8.11164 23.1506 10.6183C25.2397 8.11164 28.4406 6.52539 31.7756 6.52539C37.6789 6.52539 42.3172 11.2646 42.3172 17.2962C42.3172 24.6987 35.8006 30.7304 25.9297 39.8954L23.1506 42.4608Z" fill="#212121"/>
        </svg>
      </salla-button>
    </div>
    <div class="quickview-btn eye-icon flex justify-center items-center" onclick="clickModal(${product.id
        })" data-title="عرض سريع" data-product-id="${product.id}">
        <salla-button  fill="outline"  class="s-button-wrap hydrated " shape="btn" color="primary" size="medium" width="normal">

        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
        <path d="M21.6507 8.90039C12.6924 8.90039 5.04197 14.6021 1.94238 22.6504C5.04197 30.6987 12.6924 36.4004 21.6507 36.4004C30.6091 36.4004 38.2595 30.6987 41.3591 22.6504C38.2595 14.6021 30.6091 8.90039 21.6507 8.90039ZM21.6507 31.8171C16.7057 31.8171 12.6924 27.7104 12.6924 22.6504C12.6924 17.5904 16.7057 13.4837 21.6507 13.4837C26.5957 13.4837 30.6091 17.5904 30.6091 22.6504C30.6091 27.7104 26.5957 31.8171 21.6507 31.8171ZM21.6507 17.1504C18.6765 17.1504 16.2757 19.6071 16.2757 22.6504C16.2757 25.6937 18.6765 28.1504 21.6507 28.1504C24.6249 28.1504 27.0257 25.6937 27.0257 22.6504C27.0257 19.6071 24.6249 17.1504 21.6507 17.1504Z" fill="#212121"/>
        </svg>

        </salla-button>
    </div>
      </div>
      <a href="${product.url}" class=" block">
          <salla-slider show-controls="false" show-thumbs-controls="false" type="thumbs">
            <div slot="items">
            ${images}
            </div>
            <div slot="thumbs">
              ${thumbs}
            </div>
          </salla-slider>
          </a>
          <div>
          <div class="overflow-hidden h-8 mt-2 text-center">
            <p class="text-lg font-bold">${product.name}</p>
          </div>
          <div class="flex justify-center items-center w-full h-12">
            <div class="prices flex flex-col items-center w-full mt-2">
              <span class="after-sale text-center text-sm font-bold text-[#FFAC0D]">${this.getPriceFormat(
          product.price
        )}</span>
              <span class="before-sale text-center text-sm font-bold text-[#999999] line-through">
              ${this.getPriceFormat(product.priceDiscount)}</span>
            </div>
            
            
          </div>
          
          <div class="addToCart mt-3" data-title="إضافة للسلة">
          <salla-add-product-button shape="icon" class="flex justify-center items-center gap-4 rounded text-white py-1 px-4 w-full addToCart__btn hydrated" product-id="${product.id
        }" product-status="sale" fill="outline" product-type="product">
          <svg
          class="!w-8 !h-8"
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="48"
              viewBox="0 0 48 33"
              fill="none"
              >
              <path
              d="M25.1683 16.0466H27.3683V13.3833H30.6685V11.6077H27.3683V8.94434H25.1683V11.6077H21.8681V13.3833H25.1683V16.0466ZM20.7681 24.0367C19.558 24.0367 18.579 24.8358 18.579 25.8123C18.579 26.7889 19.558 27.5879 20.7681 27.5879C21.9781 27.5879 22.9682 26.7889 22.9682 25.8123C22.9682 24.8358 21.9781 24.0367 20.7681 24.0367ZM31.7685 24.0367C30.5585 24.0367 29.5794 24.8358 29.5794 25.8123C29.5794 26.7889 30.5585 27.5879 31.7685 27.5879C32.9785 27.5879 33.9686 26.7889 33.9686 25.8123C33.9686 24.8358 32.9785 24.0367 31.7685 24.0367ZM21.9781 19.5978H30.1734C30.9985 19.5978 31.7245 19.2338 32.0985 18.6834L36.3447 12.46L34.4306 11.6077L30.1734 17.8222H22.4512L17.765 9.83212H14.1678V11.6077H16.3679L20.3281 18.346L18.843 20.5122C18.04 21.7019 19.096 23.149 20.7681 23.149H33.9686V21.3734H20.7681L21.9781 19.5978Z"
              fill="white"
              />
            </svg>
        <span>اضف للسلة</span>
          </salla-add-product-button>
        </div>
        </div>
    </div>
  
      `;
      datas += data;
    }

    let slider = `
<salla-slider  show-controls="false" type="default">
        <div slot="items">
            ${datas}
        </div>
  </salla-slider>`;
    insert.innerHTML += slider;
  }

  // Scroll to top function
  scrollToTop() {
    let calcScrollValue = () => {
      let scrollProgress = document.getElementById("scrollToTopBtn");
      let pos = window.scrollY;
      if (pos > 100) {
        scrollProgress.style.display = "flex";
      } else {
        scrollProgress.style.display = "none";
      }
      scrollProgress.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    };

    window.onload = calcScrollValue;
    window.onscroll = calcScrollValue;
  }

  // nav link
  navLinks() {
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }
    const linkDesign = document.getElementsByClassName("navlink-design");

    for (let i = 0; i < linkDesign.length; i++) {
      const id = getRandomIntInclusive(100000, 900000);

      const child = linkDesign[i].children[0].children;

      const any = child.length;
      for (let j = 0; j < any; j++) {
        child[j].className = `${id}-nav hidden`;
      }
      linkDesign[i].children[2].setAttribute("id", `${id}-category`);
      linkDesign[i].children[3].setAttribute("id", `${id}-product`);

      const listProduct1 = document.getElementById(`${id}-product`);
      const navLinks1 = document.getElementsByClassName(`${id}-nav`);
      const listCategory1 = document.getElementById(`${id}-category`);

      for (let i = 0; i < navLinks1.length; i++) {
        const category = navLinks1[i].innerText;

        if (category) {
          salla.product.categories(category).then((response) => {
            const data = `
                  <div class="navLink-show cursor-pointer font-bold" onclick="getlistProduct(${category} , this , ${id})">
                    ${response.data.name}
                  </div>
                  `;
            listCategory1.innerHTML += data;
          });
          const data = `<salla-products-slider
                source="categories"
              source-value=[${navLinks1[0].innerText}]
              </salla-product-slider>`;

          listProduct1.innerHTML = data;
        }
      }
    }
  }

  async productBelongThree() {
    const section = document.getElementsByClassName("category-three");

    for (let i = 0; i < section.length; i++) {
      const categoryId = section[i]?.children[1]?.innerText;
      const insert = section[i]?.children[2];
      const queryParams = {
        source: "categories",
        source_value: [categoryId],
      };

      await salla.product
        .fetch(queryParams)
        .then((response) => {
          const products = response.data.slice(0, 5);
          const data = `
        <div>
        <div class="grid flex-1 gap-4 lg:grid-cols-2 sm:gap-8">
          <div id="product-${products[0].id
            }" class="product-entry product-entry--full-image overflow-hidden !justify-center !p-4 flex-col justify-center align-center" style="border-radius:40px;height:600px;background-color:#EAE9E9;">
            <a href="${products[0].url
            }" class="relative w-full h-[80%] overflow-hidden rounded-md hover:opacity-90 block mt-6">
              <img class="object-contain w-full h-full lazy loaded" src="${products[0].image.url
            }" data-src="https://cdn.salla.sa/gzRDg/SPa3pW2JutxuRHUTAtxjtCewpWd5HrYELAV0XX9G.jpg" alt="حقيبة دافل فاشيتا صحارى" loading="lazy" data-ll-status="loaded">
            </a>
            <a class="block" href="${products[0].url
            }" class="absolute top-0 bottom-0 left-0 right-0 transition-opacity duration-700  rounded-2xl" ></a>
            <div class="flex justify-center items-end">
              <div class="flex flex-col justify-center items-center mb-10">
  
                <h1 class="text-sm font-bold leading-6 text-black product-entry__title">
                  <a  href="${products[0].url
            }" style=" color : black ; font-size : 22px">${products[0].name
            }</a>
                </h1>
                <div class=" flex text-2xl justify-center items-center gap-2" >
               <h4>${this.getPriceFormat(products[0].price)}</h4>
                <span class="before-sale text-center font-bold line-through text-[#404553]">
              ${this.getPriceFormat(products[0].regular_price)}</span>

          
                
              </div>
              </div>

${products[0].sale_price < products[0].regular_price &&
            `<div class="absolute top-0 lg:top-12 left-0 py-1 px-6" style="background-color:#334155">
<p class="text-white">خصم علي هذا المنتج ${Math.floor(
              (products[0].price / products[0].regular_price) * 100
            )}%</p>
</div>`
            }
            

          <div class="flex flex-col items-center justify-center  mt-auto absolute" style=" top: 18px ; right:7px">
            
            <div class="wishlist" data-title="إضافة للسلة">
            <salla-button onclick="salla.wishlist.toggle(${products[0].id
            })" shape="icon" fill="outline" color="primary" aria-label="wishlist button" class=" s-button-wrap hydrated">
              <svg xmlns="http://www.w3.org/2000/svg" width="47" height="48" viewBox="0 0 47 48" fill="none">
              <path d="M23.1506 42.4608L20.3714 39.8758C10.5006 30.7304 3.98389 24.6987 3.98389 17.2962C3.98389 11.2646 8.62222 6.52539 14.5256 6.52539C17.8606 6.52539 21.0614 8.11164 23.1506 10.6183C25.2397 8.11164 28.4406 6.52539 31.7756 6.52539C37.6789 6.52539 42.3172 11.2646 42.3172 17.2962C42.3172 24.6987 35.8006 30.7304 25.9297 39.8954L23.1506 42.4608Z" fill="#212121"/>
              </svg>
            </salla-button>
          </div>
          
                  <div class="quickview-btn eye-icon" onclick="clickModal(${products[0].id
            })" data-title="عرض سريع" data-product-id="${products[0].id}">
                      <salla-button  fill="outline"  class="s-button-wrap hydrated " shape="btn" color="primary" size="medium" width="normal">

                      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
                      <path d="M21.6507 8.90039C12.6924 8.90039 5.04197 14.6021 1.94238 22.6504C5.04197 30.6987 12.6924 36.4004 21.6507 36.4004C30.6091 36.4004 38.2595 30.6987 41.3591 22.6504C38.2595 14.6021 30.6091 8.90039 21.6507 8.90039ZM21.6507 31.8171C16.7057 31.8171 12.6924 27.7104 12.6924 22.6504C12.6924 17.5904 16.7057 13.4837 21.6507 13.4837C26.5957 13.4837 30.6091 17.5904 30.6091 22.6504C30.6091 27.7104 26.5957 31.8171 21.6507 31.8171ZM21.6507 17.1504C18.6765 17.1504 16.2757 19.6071 16.2757 22.6504C16.2757 25.6937 18.6765 28.1504 21.6507 28.1504C24.6249 28.1504 27.0257 25.6937 27.0257 22.6504C27.0257 19.6071 24.6249 17.1504 21.6507 17.1504Z" fill="#212121"/>
                      </svg>

                      </salla-button>
                  </div>
                <div class="addToCart" data-title="إضافة للسلة">
                  <salla-add-product-button shape="icon" class="addToCart__btn hydrated" product-id="${products[0].id
            }" product-status="sale" fill="outline" product-type="product">
                  <svg xmlns="http://www.w3.org/2000/svg" width="65" height="59" viewBox="0 0 65 59" fill="none">
                  <path d="M31.7114 29.1459H34.7285V24.3429H39.2541V21.1409H34.7285V16.3379H31.7114V21.1409H27.1858V24.3429H31.7114V29.1459ZM25.6772 43.5548C24.0178 43.5548 22.6752 44.9957 22.6752 46.7568C22.6752 48.5179 24.0178 49.9588 25.6772 49.9588C27.3366 49.9588 28.6943 48.5179 28.6943 46.7568C28.6943 44.9957 27.3366 43.5548 25.6772 43.5548ZM40.7626 43.5548C39.1032 43.5548 37.7606 44.9957 37.7606 46.7568C37.7606 48.5179 39.1032 49.9588 40.7626 49.9588C42.422 49.9588 43.7797 48.5179 43.7797 46.7568C43.7797 44.9957 42.422 43.5548 40.7626 43.5548ZM27.3366 35.5499H38.5753C39.7067 35.5499 40.7023 34.8934 41.2152 33.9008L47.0382 22.6778L44.4133 21.1409L38.5753 32.3479H27.9853L21.5589 17.9389H16.626V21.1409H19.6431L25.0738 33.2924L23.0373 37.1989C21.936 39.3442 23.3842 41.9538 25.6772 41.9538H43.7797V38.7518H25.6772L27.3366 35.5499Z" fill="black"/>
                </svg>
                  </salla-add-product-button>
                </div>
              </div>
            </div>
          </div>

          <div class="grid gap-4 sm:gap-8 relative" style="grid-template-columns:repeat(2, 1fr);">
          
          <div  class="product-entry product-entry--minimal flex flex-col items-center justify-center overflow-hidden p-4 py-6" style=" border-radius : 40px ; background-color : #EAE9E9">
            <div style="height:150px;width:90%">
              <a href="${products[1].id}">
                <img class="object-cover w-full h-full lazy loaded" src="${products[1].image.url
            }" data-src="https://cdn.salla.sa/gzRDg/F3jJv4Iu3qhNIq6cTJ0wlGTA2YuwgJlngtGFDo2p.jpg" alt="حقيبة يد كبيرة" loading="lazy" data-ll-status="loaded">
              </a>
            </div>
            <div class="flex flex-col items-center justify-center  mt-auto absolute" style=" top: 18px ; right:7px">
            
            <div class="wishlist" data-title="إضافة للسلة">
            <salla-button onclick="salla.wishlist.toggle(${products[1].id
            })" shape="icon" fill="outline" color="primary" aria-label="wishlist button" class=" s-button-wrap hydrated">
              <svg xmlns="http://www.w3.org/2000/svg" width="47" height="48" viewBox="0 0 47 48" fill="none">
              <path d="M23.1506 42.4608L20.3714 39.8758C10.5006 30.7304 3.98389 24.6987 3.98389 17.2962C3.98389 11.2646 8.62222 6.52539 14.5256 6.52539C17.8606 6.52539 21.0614 8.11164 23.1506 10.6183C25.2397 8.11164 28.4406 6.52539 31.7756 6.52539C37.6789 6.52539 42.3172 11.2646 42.3172 17.2962C42.3172 24.6987 35.8006 30.7304 25.9297 39.8954L23.1506 42.4608Z" fill="#212121"/>
              </svg>
            </salla-button>
          </div>
          
                  <div class="quickview-btn eye-icon" onclick="clickModal(${products[1].id
            })" data-title="عرض سريع" data-product-id="${products[1].id}">
                      <salla-button  fill="outline"  class="s-button-wrap hydrated " shape="btn" color="primary" size="medium" width="normal">

                      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
                      <path d="M21.6507 8.90039C12.6924 8.90039 5.04197 14.6021 1.94238 22.6504C5.04197 30.6987 12.6924 36.4004 21.6507 36.4004C30.6091 36.4004 38.2595 30.6987 41.3591 22.6504C38.2595 14.6021 30.6091 8.90039 21.6507 8.90039ZM21.6507 31.8171C16.7057 31.8171 12.6924 27.7104 12.6924 22.6504C12.6924 17.5904 16.7057 13.4837 21.6507 13.4837C26.5957 13.4837 30.6091 17.5904 30.6091 22.6504C30.6091 27.7104 26.5957 31.8171 21.6507 31.8171ZM21.6507 17.1504C18.6765 17.1504 16.2757 19.6071 16.2757 22.6504C16.2757 25.6937 18.6765 28.1504 21.6507 28.1504C24.6249 28.1504 27.0257 25.6937 27.0257 22.6504C27.0257 19.6071 24.6249 17.1504 21.6507 17.1504Z" fill="#212121"/>
                      </svg>

                      </salla-button>
                  </div>
                <div class="addToCart" data-title="إضافة للسلة">
                  <salla-add-product-button shape="icon" class="addToCart__btn hydrated" product-id="${products[1].id
            }" product-status="sale" fill="outline" product-type="product">
                  <svg xmlns="http://www.w3.org/2000/svg" width="65" height="59" viewBox="0 0 65 59" fill="none">
                  <path d="M31.7114 29.1459H34.7285V24.3429H39.2541V21.1409H34.7285V16.3379H31.7114V21.1409H27.1858V24.3429H31.7114V29.1459ZM25.6772 43.5548C24.0178 43.5548 22.6752 44.9957 22.6752 46.7568C22.6752 48.5179 24.0178 49.9588 25.6772 49.9588C27.3366 49.9588 28.6943 48.5179 28.6943 46.7568C28.6943 44.9957 27.3366 43.5548 25.6772 43.5548ZM40.7626 43.5548C39.1032 43.5548 37.7606 44.9957 37.7606 46.7568C37.7606 48.5179 39.1032 49.9588 40.7626 49.9588C42.422 49.9588 43.7797 48.5179 43.7797 46.7568C43.7797 44.9957 42.422 43.5548 40.7626 43.5548ZM27.3366 35.5499H38.5753C39.7067 35.5499 40.7023 34.8934 41.2152 33.9008L47.0382 22.6778L44.4133 21.1409L38.5753 32.3479H27.9853L21.5589 17.9389H16.626V21.1409H19.6431L25.0738 33.2924L23.0373 37.1989C21.936 39.3442 23.3842 41.9538 25.6772 41.9538H43.7797V38.7518H25.6772L27.3366 35.5499Z" fill="black"/>
                </svg>
                  </salla-add-product-button>
                </div>
              </div>
            <div class="flex flex-col flex-1 p-2 overflow-hidden product-entry__content justify-center items-center">
              <h3 class="product-entry__title leading-6 mb-1.5 max-w-full">
                <a href="${products[1].id}" class=" text-4xl">${products[1].name
            }</a>
              </h3>
              <div class="w-full  flex justify-center items-center">
                <h4 class="text-sm font-bold text-store-text-secondary ${products[1].discount_ends ? "text-red-400" : ""
            }">${this.getPriceFormat(products[1].price)} </h4>
                
                  <span class="text-sm line-through text-store-text-secondary">${products[1].discount_ends
              ? products[1].discount_ends + products[1].currency
              : ""
            }</span>
                  
              </div>
              
              
            </div>
          </div>

          <div  class="product-entry product-entry--minimal flex flex-col items-center justify-center overflow-hidden p-4" style=" border-radius : 40px ; background-color : #EAE9E9">
            <div style="height:150px;width:90%">
              <a href="${products[2].id}">
                <img class="object-contain w-full h-full lazy loaded" src="${products[2].image.url
            }" data-src="https://cdn.salla.sa/gzRDg/F3jJv4Iu3qhNIq6cTJ0wlGTA2YuwgJlngtGFDo2p.jpg" alt="حقيبة يد كبيرة" loading="lazy" data-ll-status="loaded">
              </a>
            </div>
            <div class="flex flex-col items-center justify-center  mt-auto absolute" style=" top: 18px ; right:7px">
            
            <div class="wishlist" data-title="إضافة للسلة">
            <salla-button onclick="salla.wishlist.toggle(${products[2].id
            })" shape="icon" fill="outline" color="primary" aria-label="wishlist button" class=" s-button-wrap hydrated">
              <svg xmlns="http://www.w3.org/2000/svg" width="47" height="48" viewBox="0 0 47 48" fill="none">
              <path d="M23.1506 42.4608L20.3714 39.8758C10.5006 30.7304 3.98389 24.6987 3.98389 17.2962C3.98389 11.2646 8.62222 6.52539 14.5256 6.52539C17.8606 6.52539 21.0614 8.11164 23.1506 10.6183C25.2397 8.11164 28.4406 6.52539 31.7756 6.52539C37.6789 6.52539 42.3172 11.2646 42.3172 17.2962C42.3172 24.6987 35.8006 30.7304 25.9297 39.8954L23.1506 42.4608Z" fill="#212121"/>
              </svg>
            </salla-button>
          </div>
          
                  <div class="quickview-btn eye-icon" onclick="clickModal(${products[2].id
            })" data-title="عرض سريع" data-product-id="${products[2].id}">
                      <salla-button  fill="outline"  class="s-button-wrap hydrated " shape="btn" color="primary" size="medium" width="normal">

                      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
                      <path d="M21.6507 8.90039C12.6924 8.90039 5.04197 14.6021 1.94238 22.6504C5.04197 30.6987 12.6924 36.4004 21.6507 36.4004C30.6091 36.4004 38.2595 30.6987 41.3591 22.6504C38.2595 14.6021 30.6091 8.90039 21.6507 8.90039ZM21.6507 31.8171C16.7057 31.8171 12.6924 27.7104 12.6924 22.6504C12.6924 17.5904 16.7057 13.4837 21.6507 13.4837C26.5957 13.4837 30.6091 17.5904 30.6091 22.6504C30.6091 27.7104 26.5957 31.8171 21.6507 31.8171ZM21.6507 17.1504C18.6765 17.1504 16.2757 19.6071 16.2757 22.6504C16.2757 25.6937 18.6765 28.1504 21.6507 28.1504C24.6249 28.1504 27.0257 25.6937 27.0257 22.6504C27.0257 19.6071 24.6249 17.1504 21.6507 17.1504Z" fill="#212121"/>
                      </svg>

                      </salla-button>
                  </div>
                <div class="addToCart" data-title="إضافة للسلة">
                  <salla-add-product-button shape="icon" class="addToCart__btn hydrated" product-id="${products[2].id
            }" product-status="sale" fill="outline" product-type="product">
                  <svg xmlns="http://www.w3.org/2000/svg" width="65" height="59" viewBox="0 0 65 59" fill="none">
                  <path d="M31.7114 29.1459H34.7285V24.3429H39.2541V21.1409H34.7285V16.3379H31.7114V21.1409H27.1858V24.3429H31.7114V29.1459ZM25.6772 43.5548C24.0178 43.5548 22.6752 44.9957 22.6752 46.7568C22.6752 48.5179 24.0178 49.9588 25.6772 49.9588C27.3366 49.9588 28.6943 48.5179 28.6943 46.7568C28.6943 44.9957 27.3366 43.5548 25.6772 43.5548ZM40.7626 43.5548C39.1032 43.5548 37.7606 44.9957 37.7606 46.7568C37.7606 48.5179 39.1032 49.9588 40.7626 49.9588C42.422 49.9588 43.7797 48.5179 43.7797 46.7568C43.7797 44.9957 42.422 43.5548 40.7626 43.5548ZM27.3366 35.5499H38.5753C39.7067 35.5499 40.7023 34.8934 41.2152 33.9008L47.0382 22.6778L44.4133 21.1409L38.5753 32.3479H27.9853L21.5589 17.9389H16.626V21.1409H19.6431L25.0738 33.2924L23.0373 37.1989C21.936 39.3442 23.3842 41.9538 25.6772 41.9538H43.7797V38.7518H25.6772L27.3366 35.5499Z" fill="black"/>
                </svg>
                  </salla-add-product-button>
                </div>
              </div>
            <div class="flex flex-col flex-1 p-2 overflow-hidden product-entry__content justify-center items-center">
              <h3 class="product-entry__title leading-6 mb-1.5 max-w-full">
                <a href="${products[2].id}" class=" text-4xl">${products[2].name
            }</a>
              </h3>
              <div class="w-full  flex justify-center items-center">
                <h4 class="text-sm font-bold text-store-text-secondary ${products[2].discount_ends ? "text-red-400" : ""
            }">${this.getPriceFormat(products[2].price)} </h4>
                
                  <span class="text-sm line-through text-store-text-secondary">${products[2].discount_ends
              ? products[2].discount_ends + products[2].currency
              : ""
            }</span>
                  
              </div>
              
              
            </div>
          </div>




          
          <div  class="product-entry product-entry--minimal flex flex-col items-center justify-center overflow-hidden p-4" style=" border-radius : 40px ; background-color : #EAE9E9">
            <div style="height:150px;width:90%">
              <a href="${products[3].id}">
                <img class="object-contain w-full h-full lazy loaded" src="${products[3].image.url
            }" data-src="https://cdn.salla.sa/gzRDg/F3jJv4Iu3qhNIq6cTJ0wlGTA2YuwgJlngtGFDo2p.jpg" alt="حقيبة يد كبيرة" loading="lazy" data-ll-status="loaded">
              </a>
            </div>
            <div class="flex flex-col items-center justify-center  mt-auto absolute" style=" top: 18px ; right:7px">
            
            <div class="wishlist" data-title="إضافة للسلة">
            <salla-button onclick="salla.wishlist.toggle(${products[3].id
            })" shape="icon" fill="outline" color="primary" aria-label="wishlist button" class=" s-button-wrap hydrated">
              <svg xmlns="http://www.w3.org/2000/svg" width="47" height="48" viewBox="0 0 47 48" fill="none">
              <path d="M23.1506 42.4608L20.3714 39.8758C10.5006 30.7304 3.98389 24.6987 3.98389 17.2962C3.98389 11.2646 8.62222 6.52539 14.5256 6.52539C17.8606 6.52539 21.0614 8.11164 23.1506 10.6183C25.2397 8.11164 28.4406 6.52539 31.7756 6.52539C37.6789 6.52539 42.3172 11.2646 42.3172 17.2962C42.3172 24.6987 35.8006 30.7304 25.9297 39.8954L23.1506 42.4608Z" fill="#212121"/>
              </svg>
            </salla-button>
          </div>
          
                  <div class="quickview-btn eye-icon" onclick="clickModal(${products[3].id
            })" data-title="عرض سريع" data-product-id="${products[3].id}">
                      <salla-button  fill="outline"  class="s-button-wrap hydrated " shape="btn" color="primary" size="medium" width="normal">

                      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
                      <path d="M21.6507 8.90039C12.6924 8.90039 5.04197 14.6021 1.94238 22.6504C5.04197 30.6987 12.6924 36.4004 21.6507 36.4004C30.6091 36.4004 38.2595 30.6987 41.3591 22.6504C38.2595 14.6021 30.6091 8.90039 21.6507 8.90039ZM21.6507 31.8171C16.7057 31.8171 12.6924 27.7104 12.6924 22.6504C12.6924 17.5904 16.7057 13.4837 21.6507 13.4837C26.5957 13.4837 30.6091 17.5904 30.6091 22.6504C30.6091 27.7104 26.5957 31.8171 21.6507 31.8171ZM21.6507 17.1504C18.6765 17.1504 16.2757 19.6071 16.2757 22.6504C16.2757 25.6937 18.6765 28.1504 21.6507 28.1504C24.6249 28.1504 27.0257 25.6937 27.0257 22.6504C27.0257 19.6071 24.6249 17.1504 21.6507 17.1504Z" fill="#212121"/>
                      </svg>

                      </salla-button>
                  </div>
                <div class="addToCart" data-title="إضافة للسلة">
                  <salla-add-product-button shape="icon" class="addToCart__btn hydrated" product-id="${products[3].id
            }" product-status="sale" fill="outline" product-type="product">
                  <svg xmlns="http://www.w3.org/2000/svg" width="65" height="59" viewBox="0 0 65 59" fill="none">
                  <path d="M31.7114 29.1459H34.7285V24.3429H39.2541V21.1409H34.7285V16.3379H31.7114V21.1409H27.1858V24.3429H31.7114V29.1459ZM25.6772 43.5548C24.0178 43.5548 22.6752 44.9957 22.6752 46.7568C22.6752 48.5179 24.0178 49.9588 25.6772 49.9588C27.3366 49.9588 28.6943 48.5179 28.6943 46.7568C28.6943 44.9957 27.3366 43.5548 25.6772 43.5548ZM40.7626 43.5548C39.1032 43.5548 37.7606 44.9957 37.7606 46.7568C37.7606 48.5179 39.1032 49.9588 40.7626 49.9588C42.422 49.9588 43.7797 48.5179 43.7797 46.7568C43.7797 44.9957 42.422 43.5548 40.7626 43.5548ZM27.3366 35.5499H38.5753C39.7067 35.5499 40.7023 34.8934 41.2152 33.9008L47.0382 22.6778L44.4133 21.1409L38.5753 32.3479H27.9853L21.5589 17.9389H16.626V21.1409H19.6431L25.0738 33.2924L23.0373 37.1989C21.936 39.3442 23.3842 41.9538 25.6772 41.9538H43.7797V38.7518H25.6772L27.3366 35.5499Z" fill="black"/>
                </svg>
                  </salla-add-product-button>
                </div>
              </div>
            <div class="flex flex-col flex-1 p-2 overflow-hidden product-entry__content justify-center items-center">
              <h3 class="product-entry__title leading-6 mb-1.5 max-w-full">
                <a href="${products[3].id}" class=" text-4xl">${products[3].name
            }</a>
              </h3>
              <div class="w-full  flex justify-center items-center">
                <h4 class="text-sm font-bold text-store-text-secondary ${products[3].discount_ends ? "text-red-400" : ""
            }">${this.getPriceFormat(products[3].price)} </h4>
                
                  <span class="text-sm line-through text-store-text-secondary">${products[3].discount_ends
              ? products[3].discount_ends + products[3].currency
              : ""
            }</span>
              </div>
            </div>
          </div>

          <div  class="product-entry product-entry--minimal flex flex-col items-center justify-center overflow-hidden p-4" style=" border-radius : 40px ; background-color : #EAE9E9">
            <div style="height:150px;width:90%">
              <a href="${products[4].id}">
                <img class="object-contain w-full h-full lazy loaded" src="${products[4].image.url
            }" data-src="https://cdn.salla.sa/gzRDg/F3jJv4Iu3qhNIq6cTJ0wlGTA2YuwgJlngtGFDo2p.jpg" alt="${products[4].name
            }" loading="lazy" data-ll-status="loaded">
              </a>
            </div>
            <div class="flex flex-col items-center justify-center  mt-auto absolute" style=" top: 18px ; right:7px">
            
            <div class="wishlist" data-title="إضافة للسلة">
            <salla-button onclick="salla.wishlist.toggle(${products[4].id
            })" shape="icon" fill="outline" color="primary" aria-label="wishlist button" class=" s-button-wrap hydrated">
              <svg xmlns="http://www.w3.org/2000/svg" width="47" height="48" viewBox="0 0 47 48" fill="none">
              <path d="M23.1506 42.4608L20.3714 39.8758C10.5006 30.7304 3.98389 24.6987 3.98389 17.2962C3.98389 11.2646 8.62222 6.52539 14.5256 6.52539C17.8606 6.52539 21.0614 8.11164 23.1506 10.6183C25.2397 8.11164 28.4406 6.52539 31.7756 6.52539C37.6789 6.52539 42.3172 11.2646 42.3172 17.2962C42.3172 24.6987 35.8006 30.7304 25.9297 39.8954L23.1506 42.4608Z" fill="#212121"/>
              </svg>
            </salla-button>
          </div>
          
                  <div class="quickview-btn eye-icon" onclick="clickModal(${products[4].id
            })" data-title="عرض سريع" data-product-id="${products[4].id}">
                      <salla-button  fill="outline"  class="s-button-wrap hydrated " shape="btn" color="primary" size="medium" width="normal">

                      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
                      <path d="M21.6507 8.90039C12.6924 8.90039 5.04197 14.6021 1.94238 22.6504C5.04197 30.6987 12.6924 36.4004 21.6507 36.4004C30.6091 36.4004 38.2595 30.6987 41.3591 22.6504C38.2595 14.6021 30.6091 8.90039 21.6507 8.90039ZM21.6507 31.8171C16.7057 31.8171 12.6924 27.7104 12.6924 22.6504C12.6924 17.5904 16.7057 13.4837 21.6507 13.4837C26.5957 13.4837 30.6091 17.5904 30.6091 22.6504C30.6091 27.7104 26.5957 31.8171 21.6507 31.8171ZM21.6507 17.1504C18.6765 17.1504 16.2757 19.6071 16.2757 22.6504C16.2757 25.6937 18.6765 28.1504 21.6507 28.1504C24.6249 28.1504 27.0257 25.6937 27.0257 22.6504C27.0257 19.6071 24.6249 17.1504 21.6507 17.1504Z" fill="#212121"/>
                      </svg>

                      </salla-button>
                  </div>
                <div class="addToCart" data-title="إضافة للسلة">
                  <salla-add-product-button shape="icon" class="addToCart__btn hydrated" product-id="${products[4].id
            }" product-status="sale" fill="outline" product-type="product">
                  <svg xmlns="http://www.w3.org/2000/svg" width="65" height="59" viewBox="0 0 65 59" fill="none">
                  <path d="M31.7114 29.1459H34.7285V24.3429H39.2541V21.1409H34.7285V16.3379H31.7114V21.1409H27.1858V24.3429H31.7114V29.1459ZM25.6772 43.5548C24.0178 43.5548 22.6752 44.9957 22.6752 46.7568C22.6752 48.5179 24.0178 49.9588 25.6772 49.9588C27.3366 49.9588 28.6943 48.5179 28.6943 46.7568C28.6943 44.9957 27.3366 43.5548 25.6772 43.5548ZM40.7626 43.5548C39.1032 43.5548 37.7606 44.9957 37.7606 46.7568C37.7606 48.5179 39.1032 49.9588 40.7626 49.9588C42.422 49.9588 43.7797 48.5179 43.7797 46.7568C43.7797 44.9957 42.422 43.5548 40.7626 43.5548ZM27.3366 35.5499H38.5753C39.7067 35.5499 40.7023 34.8934 41.2152 33.9008L47.0382 22.6778L44.4133 21.1409L38.5753 32.3479H27.9853L21.5589 17.9389H16.626V21.1409H19.6431L25.0738 33.2924L23.0373 37.1989C21.936 39.3442 23.3842 41.9538 25.6772 41.9538H43.7797V38.7518H25.6772L27.3366 35.5499Z" fill="black"/>
                </svg>
                  </salla-add-product-button>
                </div>
              </div>
            <div class="flex flex-col flex-1 p-2 overflow-hidden product-entry__content justify-center items-center">
              <h3 class="product-entry__title leading-6 mb-1.5 max-w-full">
                <a href="${products[4].id}" class=" text-4xl">${products[1].name
            }</a>
              </h3>
              <div class="w-full  flex justify-center items-center">
                <h4 class="text-sm font-bold text-store-text-secondary ${products[4].discount_ends ? "text-red-400" : ""
            }">${this.getPriceFormat(products[4].price)} </h4>
                
                  <span class="text-sm line-through text-store-text-secondary">${products[4].discount_ends
              ? products[4].discount_ends + products[4].currency
              : ""
            }</span>
                  
              </div>
              
              
            </div>
          </div>
        
          </div>
          
        
      </div>
        
        `;
          insert.innerHTML += data;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // design 2 get all product belong to category
  prodBelongToCat() {
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }
    // const categories = document.getElementsByClassName("category-value-new");
    const newDesignProduct =
      document.getElementsByClassName("new-design-product");
    for (let i = 0; i < newDesignProduct.length; i++) {
      const id = getRandomIntInclusive(100000, 900000);
      newDesignProduct[i].children[1].setAttribute("id", id);
      const insert = document.getElementById(id);
      const lop = newDesignProduct[i]?.children[0]?.children;
      console.log(
        newDesignProduct[i]?.children[0]?.children[0],
        newDesignProduct[i]?.children[0]?.children[1]
      );

      for (let j = 0; j < 2; j++) {
        const categoryId =
          newDesignProduct[i]?.children[0]?.children[j]?.innerText;

        let name = "";
        if (categoryId) {
          salla.product.categories(categoryId).then((response) => {
            name = response.data.name;
          });

          const queryParams = {
            source: "categories",
            source_value: [categoryId],
          };

          // Call the fetch method
          salla.product
            .fetch(queryParams)
            .then((response) => {
              const products = response.data.slice(0, 3);

              const data = `
        <div>
        <div class="mb-4">
          <div>
            <h2 class="w-fit mb-8 !text-3xl !font-extrabold relative pb-2 after:absolute after:-bottom-4 after:right-0 after:w-full after:h-[10px] after:rounded-lg after:bg-[#404553]">أحدث ${name}</h2>
          </div>
        </div>
        <div class="grid flex-1 gap-4 lg:grid-cols-2 sm:gap-8">
          <div id="product-${products[0].id
                }" class="product-entry product-entry--full-image overflow-hidden !bg-[#EAE9E9] !h-[400px] lg:!h-[600px]" style="border-radius:40px;">
            <a href="${products[0].url
                }" class="relative w-full h-full overflow-hidden rounded-md hover:opacity-90">
              <img class="object-contain w-full h-full lazy loaded" src="${products[0].image.url
                }" data-src="https://cdn.salla.sa/gzRDg/SPa3pW2JutxuRHUTAtxjtCewpWd5HrYELAV0XX9G.jpg" alt="حقيبة دافل فاشيتا صحارى" loading="lazy" data-ll-status="loaded">
            </a>
            <a href="${products[0].url
                }" class="absolute top-0 bottom-0 left-0 right-0 transition-opacity duration-700  rounded-2xl" ></a>
            <div class="absolute  w-full h-full flex justify-center items-center">
              <div class="flex items-baseline justify-center">
  
                <h3 class="mb-2 text-sm font-bold leading-6 text-white product-entry__title">
                  <a href="${products[0].url
                }" style="background-color : #404553 ; padding: 10px 15px; border-radius : 20px">تسوق الان</a>
                </h3>
              </div>
            </div>
          </div>
         
          <div class="grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-8 relative" style="padding:2rem 1px">
          <div  class="product-entry product-entry--minimal flex flex-col items-center justify-center overflow-hidden p-4" style=" border-radius : 40px ; background-color : #EAE9E9">
            <div style="height:100px;width:85%">
              <a href="${products[1].id}">
                <img class="object-contain w-full h-full lazy loaded" src="${products[1].image.url
                }" data-src="https://cdn.salla.sa/gzRDg/F3jJv4Iu3qhNIq6cTJ0wlGTA2YuwgJlngtGFDo2p.jpg" alt="حقيبة يد كبيرة" loading="lazy" data-ll-status="loaded">
              </a>
            </div>
            <div class="flex flex-col items-center justify-center  mt-auto absolute" style=" top: 18px ; right:7px">
            
            <div class="wishlist" data-title="إضافة للسلة">
            <salla-button onclick="salla.wishlist.toggle(${products[1].id
                })" shape="icon" fill="outline" color="primary" aria-label="wishlist button" class=" s-button-wrap hydrated">
              <svg xmlns="http://www.w3.org/2000/svg" width="47" height="48" viewBox="0 0 47 48" fill="none">
              <path d="M23.1506 42.4608L20.3714 39.8758C10.5006 30.7304 3.98389 24.6987 3.98389 17.2962C3.98389 11.2646 8.62222 6.52539 14.5256 6.52539C17.8606 6.52539 21.0614 8.11164 23.1506 10.6183C25.2397 8.11164 28.4406 6.52539 31.7756 6.52539C37.6789 6.52539 42.3172 11.2646 42.3172 17.2962C42.3172 24.6987 35.8006 30.7304 25.9297 39.8954L23.1506 42.4608Z" fill="#212121"/>
              </svg>
            </salla-button>
          </div>
          
                  <div class="quickview-btn eye-icon" onclick="clickModal(${products[1].id
                })" data-title="عرض سريع" data-product-id="${products[1].id}">
                      <salla-button  fill="outline"  class="s-button-wrap hydrated " shape="btn" color="primary" size="medium" width="normal">

                      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
                      <path d="M21.6507 8.90039C12.6924 8.90039 5.04197 14.6021 1.94238 22.6504C5.04197 30.6987 12.6924 36.4004 21.6507 36.4004C30.6091 36.4004 38.2595 30.6987 41.3591 22.6504C38.2595 14.6021 30.6091 8.90039 21.6507 8.90039ZM21.6507 31.8171C16.7057 31.8171 12.6924 27.7104 12.6924 22.6504C12.6924 17.5904 16.7057 13.4837 21.6507 13.4837C26.5957 13.4837 30.6091 17.5904 30.6091 22.6504C30.6091 27.7104 26.5957 31.8171 21.6507 31.8171ZM21.6507 17.1504C18.6765 17.1504 16.2757 19.6071 16.2757 22.6504C16.2757 25.6937 18.6765 28.1504 21.6507 28.1504C24.6249 28.1504 27.0257 25.6937 27.0257 22.6504C27.0257 19.6071 24.6249 17.1504 21.6507 17.1504Z" fill="#212121"/>
                      </svg>

                      </salla-button>
                  </div>
                <div class="addToCart" data-title="إضافة للسلة">
                  <salla-add-product-button shape="icon" class="addToCart__btn hydrated" product-id="${products[1].id
                }" product-status="sale" fill="outline" product-type="product">
                  <svg xmlns="http://www.w3.org/2000/svg" width="65" height="59" viewBox="0 0 65 59" fill="none">
                  <path d="M31.7114 29.1459H34.7285V24.3429H39.2541V21.1409H34.7285V16.3379H31.7114V21.1409H27.1858V24.3429H31.7114V29.1459ZM25.6772 43.5548C24.0178 43.5548 22.6752 44.9957 22.6752 46.7568C22.6752 48.5179 24.0178 49.9588 25.6772 49.9588C27.3366 49.9588 28.6943 48.5179 28.6943 46.7568C28.6943 44.9957 27.3366 43.5548 25.6772 43.5548ZM40.7626 43.5548C39.1032 43.5548 37.7606 44.9957 37.7606 46.7568C37.7606 48.5179 39.1032 49.9588 40.7626 49.9588C42.422 49.9588 43.7797 48.5179 43.7797 46.7568C43.7797 44.9957 42.422 43.5548 40.7626 43.5548ZM27.3366 35.5499H38.5753C39.7067 35.5499 40.7023 34.8934 41.2152 33.9008L47.0382 22.6778L44.4133 21.1409L38.5753 32.3479H27.9853L21.5589 17.9389H16.626V21.1409H19.6431L25.0738 33.2924L23.0373 37.1989C21.936 39.3442 23.3842 41.9538 25.6772 41.9538H43.7797V38.7518H25.6772L27.3366 35.5499Z" fill="black"/>
                </svg>
                  </salla-add-product-button>
                </div>
              </div>
            <div class="flex flex-col flex-1 p-2 overflow-hidden product-entry__content justify-center items-center">
              <h3 class="product-entry__title leading-6 mb-1.5 max-w-full">
                <a href="${products[1].id}" class=" font-bold text-2xl">${products[1].name
                }</a>
              </h3>
              <div class="w-full  flex justify-center items-center">
                <h4 class="text-sm font-bold text-store-text-secondary ${products[1].discount_ends ? "text-red-400" : ""
                }">${this.getPriceFormat(products[1].price)} </h4>
                
                  <span class="text-sm line-through text-store-text-secondary">${products[1].discount_ends
                  ? products[1].discount_ends + products[1].currency
                  : ""
                }</span>
                  
              </div>
              
              
            </div>
          </div>
          <div  class="product-entry product-entry--minimal flex flex-col items-center justify-center overflow-hidden p-4" style=" border-radius : 40px ; background-color : #EAE9E9">
          <div style="height:100px;width:85%">
            <a href="${products[2].id}">
              <img class="object-contain w-full h-full lazy loaded" src="${products[2].image.url
                }" data-src="https://cdn.salla.sa/gzRDg/F3jJv4Iu3qhNIq6cTJ0wlGTA2YuwgJlngtGFDo2p.jpg" alt="حقيبة يد كبيرة" loading="lazy" data-ll-status="loaded">
            </a>
          </div>
          <div class="flex flex-col items-center justify-center mt-auto absolute" style=" top: 18px ; right:7px">
          
          <div class="wishlist" data-title="إضافة للسلة">
          <salla-button onclick="salla.wishlist.toggle(${products[2].id
                })" shape="icon" fill="outline" color="primary" aria-label="wishlist button" class=" s-button-wrap hydrated">
            <svg xmlns="http://www.w3.org/2000/svg" width="47" height="48" viewBox="0 0 47 48" fill="none">
            <path d="M23.1506 42.4608L20.3714 39.8758C10.5006 30.7304 3.98389 24.6987 3.98389 17.2962C3.98389 11.2646 8.62222 6.52539 14.5256 6.52539C17.8606 6.52539 21.0614 8.11164 23.1506 10.6183C25.2397 8.11164 28.4406 6.52539 31.7756 6.52539C37.6789 6.52539 42.3172 11.2646 42.3172 17.2962C42.3172 24.6987 35.8006 30.7304 25.9297 39.8954L23.1506 42.4608Z" fill="#212121"/>
            </svg>
          </salla-button>
        </div>
        
        <div class="quickview-btn eye-icon" onclick="clickModal(${products[2].id
                })" data-title="عرض سريع" data-product-id="${products[2].id}">
        <salla-button  fill="outline"  class="s-button-wrap hydrated " shape="btn" color="primary" size="medium" width="normal">

        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
        <path d="M21.6507 8.90039C12.6924 8.90039 5.04197 14.6021 1.94238 22.6504C5.04197 30.6987 12.6924 36.4004 21.6507 36.4004C30.6091 36.4004 38.2595 30.6987 41.3591 22.6504C38.2595 14.6021 30.6091 8.90039 21.6507 8.90039ZM21.6507 31.8171C16.7057 31.8171 12.6924 27.7104 12.6924 22.6504C12.6924 17.5904 16.7057 13.4837 21.6507 13.4837C26.5957 13.4837 30.6091 17.5904 30.6091 22.6504C30.6091 27.7104 26.5957 31.8171 21.6507 31.8171ZM21.6507 17.1504C18.6765 17.1504 16.2757 19.6071 16.2757 22.6504C16.2757 25.6937 18.6765 28.1504 21.6507 28.1504C24.6249 28.1504 27.0257 25.6937 27.0257 22.6504C27.0257 19.6071 24.6249 17.1504 21.6507 17.1504Z" fill="#212121"/>
        </svg>

        </salla-button>
    </div>
              <div class="addToCart" data-title="إضافة للسلة">
                <salla-add-product-button shape="icon" class="addToCart__btn hydrated" product-id="${products[2].id
                }" product-status="sale" fill="outline" product-type="product">
                <svg xmlns="http://www.w3.org/2000/svg" width="65" height="59" viewBox="0 0 65 59" fill="none">
                <path d="M31.7114 29.1459H34.7285V24.3429H39.2541V21.1409H34.7285V16.3379H31.7114V21.1409H27.1858V24.3429H31.7114V29.1459ZM25.6772 43.5548C24.0178 43.5548 22.6752 44.9957 22.6752 46.7568C22.6752 48.5179 24.0178 49.9588 25.6772 49.9588C27.3366 49.9588 28.6943 48.5179 28.6943 46.7568C28.6943 44.9957 27.3366 43.5548 25.6772 43.5548ZM40.7626 43.5548C39.1032 43.5548 37.7606 44.9957 37.7606 46.7568C37.7606 48.5179 39.1032 49.9588 40.7626 49.9588C42.422 49.9588 43.7797 48.5179 43.7797 46.7568C43.7797 44.9957 42.422 43.5548 40.7626 43.5548ZM27.3366 35.5499H38.5753C39.7067 35.5499 40.7023 34.8934 41.2152 33.9008L47.0382 22.6778L44.4133 21.1409L38.5753 32.3479H27.9853L21.5589 17.9389H16.626V21.1409H19.6431L25.0738 33.2924L23.0373 37.1989C21.936 39.3442 23.3842 41.9538 25.6772 41.9538H43.7797V38.7518H25.6772L27.3366 35.5499Z" fill="black"/>
              </svg>
                </salla-add-product-button>
              </div>
            </div>
          <div class="flex flex-col flex-1 p-2 overflow-hidden product-entry__content justify-center items-center">
            <h3 class="product-entry__title leading-6 mb-1.5 max-w-full">
              <a href="${products[2].id}" class=" font-extrabold text-2xl">${products[2].name
                }</a>
            </h3>
            <div class="w-full  flex justify-center items-center">
              <h4 class="text-sm font-bold text-store-text-secondary ${products[2].discount_ends ? "text-red-400" : ""
                }">${this.getPriceFormat(products[2].price)} </h4>
              
                <span class="text-sm line-through text-store-text-secondary">${products[2].discount_ends
                  ? products[2].discount_ends + products[2].currency
                  : ""
                }</span>
                
            </div>
            
            
          </div>
        </div>
          </div>
        </div>
      </div>
      `;

              insert.innerHTML += data;
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    }
  }

  //map

  getPriceFormat(price) {
    if (!price || price == 0) {
      return salla.config.get("store.settings.product.show_price_as_dash")
        ? "-"
        : "";
    }

    return salla.money(price);
  }

  map() {
    const insertMap = document.getElementById("map-content");
    const map = document.getElementById("map-new");
    const encodedString = map?.innerText;

    const container = document.createElement("div");
    container.innerHTML = encodedString;

    const iframeElement = container.firstChild.textContent;

    const data = `
${iframeElement}
`;
    if (insertMap) {
      insertMap.innerHTML = data;
    }
  }

  // all product belong category
  async productCategory() {
    const more = document.getElementsByClassName("category-1");
    const categoryId = document.getElementById(
      "category-id-product"
    )?.innerText;
    const insertElement = document.getElementById("all-pro-by-cat");
    for (let l = 0; l < more.length; l++) {
      if (categoryId) {
        const url = await salla.product
          .categories(categoryId)
          .then((response) => {
            return response.data.url;
          });
        more[l].children[2].setAttribute("href", url);
      }
      if (categoryId) {
        salla.product
          .fetch({
            source: "categories",
            source_value: [categoryId],
          })
          .then((response) => {
            const numberOfProductShow =
              response.data.length > 8
                ? response.data.length.slice(0, 8)
                : response.data.length;
            for (let i = 0; i < response.data.length; i++) {
              const product = response.data[i];
              // console.log({product})
              const data = `

						
						<a class=" flex flex-col justify-center items-center api-set-category" data-emergence="hidden" href="${product.url
                }">
              <div class="w-full h-[150px] sm:h-[200px] bg-[#D9D9D980] rounded-xl !p-4">
                <img class="rounded bg-cover object-contain w-full h-full"  src="${product.image.url
                }" alt="${product.image.alt}" />
              </div>
							<div class="flex flex-col items-center justify-center">
							<p class="category-name text-xl mt-4">${product.name}</p>
              <div class="flex justify-center items-center">
              <h4 class="text-lg font-extrabold">${this.getPriceFormat(
                  product.price
                )}</h4>
							
							
							</div>
              </div>
		</a>
    `;
              insertElement.innerHTML += data;
            }
          });
      }
    }
  }

  // elan
  removeElan() {
    const removeElanBtn = document.getElementById("remove-elan");
    if (removeElanBtn) {
      removeElanBtn.addEventListener("click", () => {
        document.getElementById("elan-bannle").remove();
      });
    }
  }

  // limited time product
  async getProductsWithLimitedOffers() {
    const insert = document.getElementById("offers-limit");
    const productsIDs = Array.from(
      document.getElementsByClassName("limited")
    ).map((v) => +v.innerHTML.trim());

    const products = [];
    const offerDate = document.getElementById("offer-date");
    console.log({ offerDate: offerDate.innerText });
    this._makeCountDown(offerDate.innerText);

    for (let i = 0; i < productsIDs.length; i++) {
      const response = await salla.product.getDetails(productsIDs[i], [
        "images",
        "sold_quantity",
        "category",
      ]);

      const product = response.data;

      products.push({
        image: product.image.url,
        name: product.name,
        discount:
          product.sale_price < product.regular_price
            ? Math.floor((product.price / product.regular_price) * 100)
            : "",
        priceDiscount:
          product.sale_price < product.regular_price
            ? product.regular_price
            : "",
        price: product.price,
        id: product.id,
        url: product.url,
      });
    }

    let allData = ``;

    for (let i = 0; i < products.length; i++) {
      console.log({ i });
      const data = `<a href="${products[i].url
        }" class="relative flex flex-col items-start justify-start ml-16" style="width:12rem;">
                  ${products[i].discount &&
        `
                        <div class="absolute top-0 right-0  w-14 h-19 bg-[#FCDB3D] flex flex-col items-start justify-between">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="30" viewbox="0 0 42 38" fill="none">
                          <g clip-path="url(#clip0_177_18631)">
                            <path d="M7.96631 4.56543V24.3266H13.6494V40.4949L26.9099 18.9372H19.3324L25.0155 4.56543H7.96631Z" fill="#212121"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_177_18631">
                              <rect width="38" height="40" fill="white" transform="translate(0.939941)"/>
                            </clipPath>
                          </defs>
                        </svg>
                        <h3 class="w-full text-sm font-bold text-center py-2">% ${products[i].discount}- </h3>
                      </div>
                        `
        }
                      
                      <div class="w-full">
                        <div class="w-full h-40 md:h-72">
                          <img class="object-contain w-full h-full" src="${products[i].image
        }"/>
                        </div>
                        <p class="w-full mt-1.5 text-3xl font-bold text-center text-black">${this.getPriceFormat(
          products[i].price
        )}</p>
                        <p class="w-full mt-1 text-xl font-bold text-center text-black text-gray-500 line-through">${this.getPriceFormat(
          products[i].priceDiscount
        )}</p>
                      </div>
                    </a>`;
      allData += data;
    }

    const dep = `
    <salla-slider show-controls="false" >
    <div slot="items">
      ${allData}
    </div>
  </salla-slider>
    `;

    insert.innerHTML += dep;
  }
  _makeCountDown(inputDateTimeStr) {
    let timerId = setInterval(() => {
      const secEl = document.getElementById("offer-sec");
      const minEl = document.getElementById("offer-min");
      const hrsEl = document.getElementById("offer-hrs");

      let inputDateTime = new Date(inputDateTimeStr);
      let currentDateTime = new Date();
      let timeDifference = +inputDateTime - +currentDateTime;
      let secondsDifference = +timeDifference / 1000;

      if (secondsDifference < 0) {
        clearInterval(timerId);
        secEl.innerText = "00";
        minEl.innerText = "00";
        hrsEl.innerText = "00";
      } else {
        let hours = Math.floor(secondsDifference / 3600);
        let remainingSeconds = secondsDifference % 3600;
        let minutes = Math.floor(remainingSeconds / 60);
        let seconds = Math.floor(remainingSeconds % 60);

        hrsEl.innerText = hours < 10 ? `0${hours}` : hours;
        minEl.innerText = minutes < 10 ? `0${minutes}` : minutes;
        secEl.innerText = seconds < 10 ? `0${seconds}` : seconds;
      }
    }, 900);
  }

  //time stamp
  timeStamp() {
    const timeStamps = document.getElementsByClassName("time-stamp");
    const inserts = document.getElementsByClassName("insert-time");
    for (let i = 0; i < timeStamps.length; i++) {
      const timeStamp = timeStamps[i].innerText;
      const insert = inserts[i];
      insert.innerText = new Date(parseInt(timeStamp)).toLocaleDateString();
    }
  }

  //fetch category
  getAllCategory() {
    const categories = document.getElementsByClassName("category-value");
    const names = document.getElementsByClassName("category-name");
    const anchors = document.getElementsByClassName("api-set-category");
    const image = document.getElementsByClassName("image-catetgory");
    if (categories) {
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i].innerText;
        const name = names[i];
        const anchor = anchors[i];
        const img = image[i];
        if (category) {
          console.log({ category });
          salla.product.categories(category).then((response) => {
            console.log(response);
            if (name) name.innerText = response.data.name;
            anchor.href = response.data.url;
            // img.setAttribute("src" , response.data.image)
          });
        }
      }
    }
  }

  //elan slider
  elanSldier() {
    const btnShow = document.getElementById("btn-open");
    const showSlider = document.getElementById("animated-ads");
    if (btnShow) {
      btnShow.addEventListener("click", () => {
        showSlider.classList.toggle("open");
      });
    }
  }

  loadModalImgOnclick() {
    document.querySelectorAll(".load-img-onclick").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        let modal = document.querySelector("#" + link.dataset.modalId),
          img = modal.querySelector("img"),
          imgSrc = img.dataset.src;
        modal.open();

        if (img.classList.contains("loaded")) return;

        img.src = imgSrc;
        img.classList.add("loaded");
      });
    });
  }

  commonThings() {
    this.cleanContentArticles(".content-entry");
  }

  cleanContentArticles(elementsSelector) {
    let articleElements = document.querySelectorAll(elementsSelector);

    if (articleElements.length) {
      articleElements.forEach((article) => {
        article.innerHTML = article.innerHTML.replace(/\&nbsp;/g, " ");
      });
    }
  }

  copyToClipboard(event) {
    event.preventDefault();
    let aux = document.createElement("input"),
      btn = event.currentTarget;
    aux.setAttribute("value", btn.dataset.content);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    this.toggleElementClassIf(btn, "copied", "code-to-copy", () => true);
    setTimeout(() => {
      this.toggleElementClassIf(btn, "code-to-copy", "copied", () => true);
    }, 1000);
  }

  initiateNotifier() {
    salla.notify.setNotifier(function (message, type, data) {
      if (typeof message == "object") {
        return Swal.fire(message).then(type);
      }

      return Swal.mixin({
        toast: true,
        position: salla.config.get("theme.is_rtl") ? "top-start" : "top-end",
        showConfirmButton: false,
        timer: 3500,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      }).fire({
        icon: type,
        title: message,
        showCloseButton: true,
        timerProgressBar: true,
      });
    });
  }

  initiateMobileMenu() {
    let menu = this.element("#mobile-menu");
    //in landing menu will not be their
    if (!menu) {
      return;
    }
    menu = new MobileMenu(
      menu,
      "(max-width: 1024px)",
      "( slidingSubmenus: false)"
    );
    salla.lang.onLoaded(() => {
      menu.navigation({ title: salla.lang.get("blocks.header.main_menu") });
    });
    const drawer = menu.offcanvas({
      position: salla.config.get("theme.is_rtl") ? "right" : "left",
    });

    this.onClick("a[href='#mobile-menu']", (event) => {
      document.body.classList.add("menu-opened");
      event.preventDefault() || drawer.close() || drawer.open();
    });
    this.onClick(".close-mobile-menu", (event) => {
      document.body.classList.remove("menu-opened");
      event.preventDefault() || drawer.close();
    });
  }

  initiateStickyMenu() {
    let header = this.element("#mainnav"),
      height = this.element("#mainnav .inner")?.clientHeight;
    //when it's landing page, there is no header
    if (!header) {
      return;
    }

    window.addEventListener("load", () =>
      setTimeout(() => this.setHeaderHeight(), 500)
    );
    window.addEventListener("resize", () => this.setHeaderHeight());

    window.addEventListener(
      "scroll",
      () => {
        window.scrollY >= header.offsetTop + height
          ? header.classList.add("fixed-pinned", "animated")
          : header.classList.remove("fixed-pinned");
        window.scrollY >= 200
          ? header.classList.add("fixed-header")
          : header.classList.remove("fixed-header", "animated");
      },
      { passive: true }
    );
  }

  setHeaderHeight() {
    let height = this.element("#mainnav .inner").clientHeight,
      header = this.element("#mainnav");
    header.style.height = height + "px";
  }

  /**
   * Because salla caches the response, it's important to keep the alert disabled if the visitor closed it.
   * by store the status of the ad in local storage `salla.storage.set(...)`
   */
  initiateAdAlert() {
    let ad = this.element(".salla-advertisement");

    if (!ad) {
      return;
    }

    if (!salla.storage.get("statusAd-" + ad.dataset.id)) {
      ad.classList.remove("hidden");
    }

    this.onClick(".ad-close", function (event) {
      event.preventDefault();
      salla.storage.set("statusAd-" + ad.dataset.id, "dismissed");

      anime({
        targets: ".salla-advertisement",
        opacity: [1, 0],
        duration: 300,
        height: [ad.clientHeight, 0],
        easing: "easeInOutQuad",
      });
    });
  }

  initiateDropdowns() {
    this.onClick(".dropdown__trigger", ({ target: btn }) => {
      btn.parentElement.classList.toggle("is-opened");
      document.body.classList.toggle("dropdown--is-opened");
      // Click Outside || Click on close btn
      window.addEventListener("click", ({ target: element }) => {
        if (
          (!element.closest(".dropdown__menu") && element !== btn) ||
          element.classList.contains("dropdown__close")
        ) {
          btn.parentElement.classList.remove("is-opened");
          document.body.classList.remove("dropdown--is-opened");
        }
      });
    });
  }

  initiateModals() {
    this.onClick("[data-modal-trigger]", (e) => {
      let id = "#" + e.target.dataset.modalTrigger;
      this.removeClass(id, "hidden");
      setTimeout(() => this.toggleModal(id, true)); //small amont of time to running toggle After adding hidden
    });
    salla.event.document.onClick("[data-close-modal]", (e) =>
      this.toggleModal("#" + e.target.dataset.closeModal, false)
    );
  }

  toggleModal(id, isOpen) {
    this.toggleClassIf(
      `${id} .s-salla-modal-overlay`,
      "ease-out duration-300 opacity-100",
      "opacity-0",
      () => isOpen
    )
      .toggleClassIf(
        `${id} .s-salla-modal-body`,
        "ease-out duration-300 opacity-100 translate-y-0 sm:scale-100", //add these classes
        "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95", //remove these classes
        () => isOpen
      )
      .toggleElementClassIf(
        document.body,
        "modal-is-open",
        "modal-is-closed",
        () => isOpen
      );
    if (!isOpen) {
      setTimeout(() => this.addClass(id, "hidden"), 350);
    }
  }

//  toggleProductFilterMenu () {
//     const buttonEl = document.getElementById('product-filter');
//     const menuEl = document.getElementById('popup-filter');
//     const closeBtnEl = document.getElementById('popup-filter-close-btn');

//     let isMenuOpen = false;

//     const onOpen = () => {
//       menuEl.classList.remove('hidden');
//       isMenuOpen = true;
//     }

//     const onClose = () => {
//       menuEl.classList.add('hidden');
//       isMenuOpen = false;
//     }

//     buttonEl.onclick = onOpen;
//     closeBtnEl.onclick = onClose;
//   }

  initiateCollapse() {
    document.querySelectorAll(".btn--collapse").forEach((trigger) => {
      const content = document.querySelector("#" + trigger.dataset.show);
      const state = { isOpen: false };

      const onOpen = () =>
        anime({
          targets: content,
          duration: 225,
          height: content.scrollHeight,
          opacity: [0, 1],
          easing: "easeOutQuart",
        });

      const onClose = () =>
        anime({
          targets: content,
          duration: 225,
          height: 0,
          opacity: [1, 0],
          easing: "easeOutQuart",
        });

      const toggleState = (isOpen) => {
        state.isOpen = !isOpen;
        this.toggleElementClassIf(
          content,
          "is-closed",
          "is-opened",
          () => isOpen
        );
      };

      trigger.addEventListener("click", () => {
        const { isOpen } = state;
        toggleState(isOpen);
        isOpen ? onClose() : onOpen();
      });
    });
  }

  /**
   * Workaround for seeking to simplify & clean, There are three ways to use this method:
   * 1- direct call: `this.anime('.my-selector')` - will use default values
   * 2- direct call with overriding defaults: `this.anime('.my-selector', {duration:3000})`
   * 3- return object to play it letter: `this.anime('.my-selector', false).duration(3000).play()` - will not play animation unless calling play method.
   * @param {string|HTMLElement} selector
   * @param {object|undefined|null|null} options - in case there is need to set attributes one by one set it `false`;
   * @return {Anime|*}
   */
  anime(selector, options = null) {
    let anime = new Anime(selector, options);
    return options === false ? anime : anime.play();
  }

  /**
   * These actions are responsible for pressing "add to cart" button,
   * they can be from any page, especially when mega-menu is enabled
   */
  initAddToCart() {
    salla.cart.event.onUpdated((summary) => {
      document
        .querySelectorAll("[data-cart-total]")
        .forEach((el) => (el.innerText = salla.money(summary.total)));
      document
        .querySelectorAll("[data-cart-count]")
        .forEach((el) => (el.innerText = salla.helpers.number(summary.count)));
    });

    salla.cart.event.onItemAdded((response, prodId) => {
      app
        .element("salla-cart-summary")
        .animateToCart(app.element(`#product-${prodId} img`));
    });
  }
}

salla.onReady(() => new App().loadTheApp());
