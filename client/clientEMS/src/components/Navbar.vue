<script>
export default {
    props: ['username', 'currentPage', 'navStatus', 'changePage', 'doLogout'],
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div class="container-fluid align-items-center">
    <a class="navbar-brand">
      <img src="../assets//ems.png" alt="Logo" class="logo-img">
      EMS</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav align-items-center">
          <a :class="['nav-link', { 'active': currentPage === 'dashboard' }, navStatus]" @click="changePage('dashboard')" href="#">Dashboard</a>
          <a :class="['nav-link', { 'active': currentPage === 'showemployees' }, navStatus]" @click="changePage('showemployees')" href="#">Employees</a>
          <a :class="['nav-link', { 'active': currentPage === 'showbranches' }, navStatus]" @click="changePage('showbranches')" href="#">Branches</a>
          <a :class="['nav-link', { 'active': currentPage === 'showpositions' }, navStatus]" @click="changePage('showpositions')" href="#">Positions</a>
        <div class="nav-item d-flex align-items-center" style="margin-left:85vh">
          <p class="mb-0 me-3">Hi <span id="username">{{username}}</span>!</p>
          <a :class="['nav-link', navStatus]" @click="doLogout()" href="#">Logout</a>
        </div>
      </div>
    </div>
  </div>
  </nav>
</template>