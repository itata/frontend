<template>
   <div class="bodyContent">
      <div id="leftSidebar">
         <div class="menuProfile">
            <ul class="listMenu">
               <li class="item">
                  <router-link :to="profilePatch">
                     <span class="labelIcon">
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
                     </span>
                     Profile
                  </router-link>
               </li>
               <li class="item">
                  <router-link :to="balancePatch" class="active">
                     <span class="labelIcon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17">
                           <g transform="translate(0.5 0.5)">
                              <circle class="iconWallet" cx="1.6" cy="1.6" r="1.6" transform="translate(9.6 8.533)"/>
                              <path class="iconWallet" d="M.5,2.633V14.367A2.133,2.133,0,0,0,2.633,16.5H16.5V4.767H2.633A2.133,2.133,0,0,1,.5,2.633h0A2.133,2.133,0,0,1,2.633.5h9.6V2.633" transform="translate(-0.5 -0.5)"/>
                           </g>
                        </svg>
                     </span>
                     Balance
                  </router-link>
               </li>
               <li class="item">
                  <a href="#">
                     <span class="labelIcon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.051 17">
                           <g transform="translate(0.025)">
                              <g transform="translate(0.5 0.5)">
                                 <line class="iconWallet2" x2="16" transform="translate(0 5.333)"/>
                                 <path class="iconWallet2" d="M13.833,5.5l2.407,5.375a3.9,3.9,0,0,1-3.647,5.292H4.406A3.9,3.9,0,0,1,.759,10.875L3.167,5.5" transform="translate(-0.5 -0.167)"/>
                                 <circle class="iconWallet2" cx="1.6" cy="1.6" r="1.6" transform="translate(3.2)"/>
                                 <circle class="iconWallet2" cx="1.6" cy="1.6" r="1.6" transform="translate(9.6)"/>
                              </g>
                           </g>
                        </svg>
                     </span>
                     Funding
                  </a>
               </li>
               <li class="item">
                  <a href="#">
                     <span class="labelIcon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.867 17">
                           <g transform="translate(1 2)">
                              <g transform="translate(-0.5 -1.5)">
                                 <path class="iconLock" d="M14.3,16.1H2.567A1.067,1.067,0,0,1,1.5,15.033V7.567A1.067,1.067,0,0,1,2.567,6.5H14.3a1.067,1.067,0,0,1,1.067,1.067v7.467A1.067,1.067,0,0,1,14.3,16.1Z" transform="translate(-1.5 -0.1)"/>
                                 <path class="iconLock" d="M4.5,6.9V4.233A3.733,3.733,0,0,1,8.233.5h0a3.733,3.733,0,0,1,3.733,3.733V6.9" transform="translate(-1.3 -0.5)"/>
                                 <ellipse class="iconLock" cx="1.6" cy="1.6" rx="1.6" ry="1.6" transform="translate(5.333 9.6)"/>
                              </g>
                           </g>
                        </svg>
                     </span>
                     Security
                  </a>
               </li>
               <li class="item">
                  <a href="#">
                     <span class="labelIcon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 15">
                           <g transform="translate(0 -1)">
                              <ellipse class="iconPeople" cx="3.2" cy="3.231" rx="3.2" ry="3.231" transform="translate(2.633 1.5)"/>
                              <ellipse class="iconPeople" cx="2.133" cy="2.154" rx="2.133" ry="2.154" transform="translate(11.167 2.577)"/>
                              <path class="iconPeople" d="M5.833,9.5h0A5.359,5.359,0,0,0,.5,14.885H11.167A5.359,5.359,0,0,0,5.833,9.5Z" transform="translate(0 0.615)"/>
                              <path class="iconPeople" d="M10.841,9.038a3.163,3.163,0,0,1,1.77-.538h0a3.215,3.215,0,0,1,3.2,3.231v1.077h-3.2" transform="translate(0.689 0.538)"/>
                           </g>
                        </svg>
                     </span>
                     Affiliate
                  </a>
               </li>
            </ul>
         </div>
      </div>
      <div class="rightContent">
         <div class="profile">
            <div class="title">
               <h4>Account Balance: </h4>
            </div>
         </div>
      </div>
   </div>
</template>
<script src="./index.js"></script>