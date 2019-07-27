<template>
  <header>
    <div id="leftNav"><router-link :to="homePath" class="logo">Kingbet</router-link>
    </div>
    <div id="rightNav">
      <div class="listTopNav">
        <ul>
          <li>
            <a href="#" class="">Sports Betting</a>
          </li>
          <li>
            <router-link :to="casinoPath" class="opa">Casino</router-link>
          </li>
          <li>
            <a class="button btn-large btn-primary round btn-active btn-bounce">Funding</a>
          </li>
        </ul>
      </div>
    
        <template  v-if="isAuthenticated">
          <ul class="infoMem">
            <li class="transfer"><a href="#" class="button btn-large round-medium hasIcon btn-primary btn-green">
              <span class="labelIcon">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.564 11.564" ><defs></defs><g transform="translate(-256 1332)"><g transform="translate(256 -1332)"><path class="a" d="M0,9.154v.964c0,.8,1.942,1.445,4.336,1.445s4.336-.648,4.336-1.445V9.154a8.213,8.213,0,0,1-4.336.964A8.213,8.213,0,0,1,0,9.154ZM7.227,2.891c2.394,0,4.336-.648,4.336-1.445S9.621,0,7.227,0,2.891.648,2.891,1.445,4.833,2.891,7.227,2.891ZM0,6.785V7.95C0,8.747,1.942,9.4,4.336,9.4S8.673,8.747,8.673,7.95V6.785A7.273,7.273,0,0,1,4.336,7.95,7.273,7.273,0,0,1,0,6.785Zm9.4.248c1.294-.251,2.168-.716,2.168-1.251V4.817A5.546,5.546,0,0,1,9.4,5.6ZM4.336,3.614C1.942,3.614,0,4.422,0,5.42S1.942,7.227,4.336,7.227,8.673,6.419,8.673,5.42,6.73,3.614,4.336,3.614ZM9.289,4.885c1.355-.244,2.274-.723,2.274-1.272V2.649a7.353,7.353,0,0,1-3.629.944A2.529,2.529,0,0,1,9.289,4.885Z"/></g></g></svg>
              </span>
              Transfer
              </a></li>
            <li class="balance"><a href="#"><span class="label opa">Balance:</span> <span class="currency">100,000 <span class="unit">KGB</span></span></a></li>
            <li class="mybet "><a href="#" class="opa">My bet</a></li>
            <li class="profile"><a href="javascript:void(0)" class="detailProfile"><i class="fas fa-user"></i> {{profile.displayName}}</a>

              <div class="popupInfo">
                  <div class="intro">
             <div class="becomeInvestor">
                <span class="icon">
                 <i class="fas fa-star"></i> 
             </span>
             <span class="label">Become an investor</span> 
             </div> 
             <button class="button btn-large round btn-border btn-primary btn-hover investor btn-bounce">Invest now</button>
         </div> 
                <ul class="listTools">
                  <li class="item"><router-link :to="profilePath"><span class="labelIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17"> 
                    <g id="circle-09" transform="translate(-1 3)">
                      <g id="Group_65" data-name="Group 65" transform="translate(1.5 -2.5)">
                        <circle id="Ellipse_21" data-name="Ellipse 21" class="iconProfile" cx="3.733" cy="3.733" r="3.733" transform="translate(4.267 3.2)"/>
                        <path id="Path_54" data-name="Path 54" class="iconProfile" d="M6.761,10.162A2.068,2.068,0,0,1,5.3,12.076L2.886,13.236a2.066,2.066,0,0,0-.294.153" transform="translate(-0.361 0.144)"/>
                        <path id="Path_55" data-name="Path 55" class="iconProfile" d="M13.668,13.39a2.066,2.066,0,0,0-.294-.153l-2.416-1.161c-.887-.467-1.456-1-1.456-1.914" transform="translate(0.1 0.144)"/>
                        <circle id="Ellipse_22" data-name="Ellipse 22" class="iconProfile" cx="8" cy="8" r="8" transform="translate(0)"/>
                      </g>
                    </g>
                  </svg>
                     </span>Profile</router-link></li>
                  <li class="item"><a href="#"><span class="labelIcon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17"><g transform="translate(0.5 0.5)"><circle class="iconWallet" cx="1.6" cy="1.6" r="1.6" transform="translate(9.6 8.533)"/><path class="iconWallet" d="M.5,2.633V14.367A2.133,2.133,0,0,0,2.633,16.5H16.5V4.767H2.633A2.133,2.133,0,0,1,.5,2.633h0A2.133,2.133,0,0,1,2.633.5h9.6V2.633" transform="translate(-0.5 -0.5)"/></g></svg>

                    </span>Balance</a></li>
                  <li class="item"> <a href="#"> <span class="labelIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.051 17"><g transform="translate(0.025)"><g transform="translate(0.5 0.5)"><line class="iconWallet2" x2="16" transform="translate(0 5.333)"/><path class="iconWallet2" d="M13.833,5.5l2.407,5.375a3.9,3.9,0,0,1-3.647,5.292H4.406A3.9,3.9,0,0,1,.759,10.875L3.167,5.5" transform="translate(-0.5 -0.167)"/><circle class="iconWallet2" cx="1.6" cy="1.6" r="1.6" transform="translate(3.2)"/><circle class="iconWallet2" cx="1.6" cy="1.6" r="1.6" transform="translate(9.6)"/></g></g></svg>
                    </span>Funding</a></li>
                  <li class="item"> <a href="#"> <span class="labelIcon">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.867 17"> 
                    <g transform="translate(1 2)"><g transform="translate(-0.5 -1.5)"><path class="iconLock" d="M14.3,16.1H2.567A1.067,1.067,0,0,1,1.5,15.033V7.567A1.067,1.067,0,0,1,2.567,6.5H14.3a1.067,1.067,0,0,1,1.067,1.067v7.467A1.067,1.067,0,0,1,14.3,16.1Z" transform="translate(-1.5 -0.1)"/><path class="iconLock" d="M4.5,6.9V4.233A3.733,3.733,0,0,1,8.233.5h0a3.733,3.733,0,0,1,3.733,3.733V6.9" transform="translate(-1.3 -0.5)"/><ellipse class="iconLock" cx="1.6" cy="1.6" rx="1.6" ry="1.6" transform="translate(5.333 9.6)"/></g></g></svg>
                   
                    </span>Security</a></li>
                  <li class="item"> <a href="#"> <span class="labelIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 15"><g transform="translate(0 -1)"><ellipse class="iconPeople" cx="3.2" cy="3.231" rx="3.2" ry="3.231" transform="translate(2.633 1.5)"/><ellipse class="iconPeople" cx="2.133" cy="2.154" rx="2.133" ry="2.154" transform="translate(11.167 2.577)"/><path class="iconPeople" d="M5.833,9.5h0A5.359,5.359,0,0,0,.5,14.885H11.167A5.359,5.359,0,0,0,5.833,9.5Z" transform="translate(0 0.615)"/><path class="iconPeople" d="M10.841,9.038a3.163,3.163,0,0,1,1.77-.538h0a3.215,3.215,0,0,1,3.2,3.231v1.077h-3.2" transform="translate(0.689 0.538)"/></g></svg>
                    </span>Affiliate</a></li>
                  <li class="item logout">
                    <a href="javascript:void(0)" @click.prevent="logout()"> <span class="labelIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15"><g transform="translate(0 -1)"><line class="iconLogout" x2="10" transform="translate(5.5 8.5)"/><path class="iconLogout" d="M11.5,4.5l4,4-4,4"/><path class="iconLogout" d="M8.5,15.5h-7a1,1,0,0,1-1-1V2.5a1,1,0,0,1,1-1h7"/></g></svg>
                    </span>Sign out</a>
                   </li>
                </ul>
              </div>
            </li>
          </ul>
        </template>
       <template v-else>
           <div class="userHub">
               <router-link class="button btn-large round btn-none login hasIcon" :to="loginPath">
                 <span class="labelIcon"><i class="far fa-user-circle"></i></span>
                  Login</router-link> 
                   <router-link class="button btn-large round btn-border btn-primary btn-hover register btn-bounce" :to="registerPath">
                   REGISTER</router-link> 
         </div>
         </template>
      
     
    </div>
  </header>
  <!-- <div class="header navbar navbar-default navbar-fixed-top p-0" :class="{auth:isAuthenticated}">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark p-0 w-100">
        <router-link class="navbar-brand font-weight-bold" :to="homePath">
          KingBet
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto py-3">
            <li class="nav-item active">
              <router-link class="" :to="casinoPath">{{$t('Casino')}}</router-link>
            </li>
            <li class="nav-item">
              <a href="#">Funding</a>
            </li>
          </ul>
          <div class="ml-auto">
            <ul class="navbar-nav mr-auto">
              <li v-if="isAuthenticated">
                <div class="btn-group">
                  <a class="dropdown-toggle dropdown-toggle-split dropdownAction align-middle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{profile.displayName}}</a>
                  <div class="dropdown-menu align-middle">
                    <ul>
                      <li>
                        <router-link class="align-middle" :to="profilePath">{{$t('Profile')}}</router-link>
                      </li>
                      <li>
                        <router-link class="" :to="profilePath">{{$t('Security')}}</router-link>
                      </li>
                      <li>
                        <router-link class="" :to="profilePath">{{$t('Verification')}}</router-link>
                      </li>
                      <li>
                        <a @click.prevent="logout()">{{$t('Signout')}}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <template v-else>
                <li class="nav-item">
                  <router-link :to="loginPath">{{$t('Login')}} <i class="fas fa-home"></i></router-link>
                </li>
                <li class="nav-item">
                  <router-link class="btn btnInfo" :to="registerPath">{{$t('Sign Up')}}</router-link>
                </li>
              </template>
               <li>
                <select class="select languages" v-model="currentLanguageCode" @change="changeLanguage">
                  <template v-for="item in languages">
                    <option v-bind:value="item.code" v-bind:key="item">{{item.name}}</option>
                  </template>
                </select>
              </li>
              <li>
                <a href="" class="nav-link">
                  <i class="pe-7s-moon"></i>
                </a>
              </li>  
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div> -->
</template>
 
<script src="./index.js"></script>