<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link" active-class="active">
                Home
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/people" class="nav-link" active-class="active">
                Personas
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/about" class="nav-link" active-class="active">
                Acerca de mi
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <div class="container-fluid">
    <div class="row">
      <RouterView />
    </div>
  </div>
</template>
