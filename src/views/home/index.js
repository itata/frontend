import Swiper from '../../assets/vendor/swiperjs/js/swiper.min.js';
import appStore, {
  APP_MUTATION
} from "../../store/app"
export default {
    data() {
        return {
        }
    },
    mounted(){
        var swiperSlide = new Swiper('.swiper-slide-container', {
          speed:1000,
          autoplay: {
            delay: 2000,
          },
          pagination: {
              el: '.swiper-slide-pagination'
            }
          });

          var scrollSport = new Swiper('.swiper-scrollSport-container', {
            slidesPerView: 12,
            freeMode: true,
            breakpoints: {
              1024: {
                slidesPerView: 10, 
              },
              768: {
                slidesPerView: 8, 
              },
              640: {
                slidesPerView: 6, 
              },
              320: {
                slidesPerView: 4, 
              }
            }
          });

          
          $('.listTab li a').click(function() { 
            $('.listTab li a').each(function(i, obj) { 
              $(this).removeClass('active'); 
          });
          $(this).addClass('active');
          });

          $('.boxSport .title .readMore').click(function() {
            
            
              if($(this).hasClass('open'))
              {
                $(this).removeClass('open');
                $(this).addClass('close');
                $(this).parents('.boxSport').find('.mainBox').css({'display': 'none'})
              }
              else{
                $(this).removeClass('close');
                $(this).addClass('open');
                $(this).parents('.boxSport').find('.mainBox').css({'display': 'block'})
              }
          });

    },
    created() {
      appStore.commit(APP_MUTATION.hide_sidebar, false)
  },
}