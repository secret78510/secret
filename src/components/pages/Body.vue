<template>
  <div>
    <section>
      <div class="img"></div>
    </section>
    <section>
      <div class="content">
        <div class="container-fuild text-white" style="position: relative">
          <div class="row">
            <div class="col col-md-6 text-md-dark">
              <h2 class="mt-5 text-primary ml-5">鼠年特價活動</h2>
              <ul>
                <li class="date">
                  <div class="row">
                    <div class="col-2">
                      <small>2020</small>
                      <p class="text-info">1/24</p>
                    </div>
                    <div class="col-10 mt-3">
                      <p class="font-weight-bold">除夕 全面商品打7折</p>
                    </div>
                  </div>
                </li>
                <li class="date">
                  <div class="row">
                    <div class="col-2">
                      <small>2020</small>
                      <p class="text-info">1/25</p>
                    </div>
                    <div class="col-10 mt-3">
                      <p class="font-weight-bold">過年當天 全館買一送一唷</p>
                    </div>
                  </div>
                </li>
                <li class="date">
                  <div class="row">
                    <div class="col-2">
                      <small>2020</small>
                      <p class="text-info">1/29</p>
                    </div>
                    <div class="col-10 mt-3">
                      <p class="font-weight-bold">開工日 買蘋果送橘子 大橘大利</p>
                    </div>
                  </div>
                </li>
                <li class="date">
                  <div class="row">
                    <div class="col-2">
                      <small>2020</small>
                      <p class="text-info">2/14</p>
                    </div>
                    <div class="col-10 mt-3">
                      <p class="font-weight-bold">情人節優惠活動 凡購買超過500元贈送玫瑰一朵</p>
                    </div>
                  </div>
                </li>
                <li class="date">
                  <div class="row">
                    <div class="col-2">
                      <small>2020</small>
                      <p class="text-info">2/28</p>
                    </div>
                    <div class="col-10 mt-3">
                      <p class="font-weight-bold">所有水果優惠8折</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="col col-md-6 backgroundImg"></div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container-fiuld">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="6"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="7"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="8"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="9"></li>
          </ol>
          <div class="carousel-inner">
            <div
              class="carousel-item header-carousel-item w-100 bg-cover active"
              style="background-image:url(https://images.unsplash.com/photo-1501777814630-33bc4a3c3ee7?ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80)"
            ></div>
            <div class="carousel-caption d-none d-md-block px-3">
              <h5>本店熱銷商品</h5>
              <p>城小中假上問，洲元化究變快歡專，臺正機上色從多空放我。來來中的來落行間我海府子成隨上事女，的石在朋經以定空他；級病期他，會性前集一於得當院應對分！意斯能己水成神錢。</p>
            </div>
            <div
              class="carousel-item header-carousel-item w-100 bg-cover"
              v-for="item in products"
              :key="item.id"
              :style="{backgroundImage: `url(${item.image})`}"
            ></div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      products: []
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUMSTOMPATH}/products`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
      });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style lang="scss" scoped>
.img {
  background-image: url(../../assets/img/theme.png);
  width: 100%;
  height: 35vw;
  background-position: center;
  background-size: cover;
}
.bg-cover {
  background-size: cover;
  background-position: center;
}
.header-carousel-item {
  height: 380px;
}
.carousel-caption {
  background-color: rgba(0, 0, 0, 0.6);
}
.content {
  .backgroundImg {
    background-image: url(../../assets/img/body.png);
    background-position: center;
    background-size: cover;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
  }
  .date {
    list-style: none;
    border-bottom: 2px dotted #4caf50;

    p {
      margin: 0;
      font-size: 20px;
    }
  }
  .text-md-dark {
    z-index: 1100;
  }
}
@media (min-width: 768px) {
  .text-md-dark {
    color: #333;
  }
}
</style>