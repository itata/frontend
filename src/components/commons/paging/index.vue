<template>
  <div class="row">
    <div v-if="model && !model.empty" class="col-md-12">
      <div class="pull-left m-b-sm">
        <span>
          Showing {{model.from}} to {{model.to}}
          <span v-if="!model.empty">
            of {{model.total}}
          </span>
          entries
        </span>
      </div>
      <ul class="pagination pull-right" style="margin: 0">
        <li class="paginate_button previous" :class="{'disabled': model.page === model.minPage}">
          <a @click.prevent="selectPage(model.minPage)" href="#">
            <span class="fa fa-chevron-left"></span>
          </a>
        </li>
        <li v-for="num in model.items" :key="num" class="paginate_button" :class="{'active': model.page === num}">
          <a @click.prevent="selectPage(num)" href="#">{{num | number}}</a>
        </li>
        <li class="paginate_button next" :class="{'disabled': model.page === model.maxPage}">
          <span @click.prevent="selectPage(model.maxPage)" class="fa fa-chevron-right"></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script src="./index.js"></script>