<script>
export default {
    emits: ['doRegister', 'switchToLogin'],
    data() {
        return {
            inputRegister: {
                fullName: '',
                email: '',
                password: '',
                phoneNumber: '',
                address: '',
                npk: ''
            }
        }
    },
    methods: {
        doRegister() {
            this.$emit('doRegister', this.inputRegister);
        },
        switchToLogin() {
            this.$emit('switchToLogin')
        }
    }
}
</script>

<template>
    <section id="register-section">
      <div class="register-container">
        <h2 class="mb-4">➕ Add New Admin</h2>
        <form>
          <div class="mb-2">
            <input v-model="inputRegister.fullName" type="text" class="form-control" placeholder="Fullname" required />
          </div>
          <div class="mb-2">
            <input v-model="inputRegister.email" type="email" class="form-control" placeholder="Email" required />
          </div>
          <div class="mb-2">
            <input v-model="inputRegister.password" type="password" class="form-control" placeholder="Password" required />
          </div>
          <div class="mb-2">
            <input v-model="inputRegister.phoneNumber" type="tel" class="form-control" placeholder="Phone Number" required />
          </div>
          <div class="mb-2">
            <input v-model="inputRegister.address" type="text" class="form-control" placeholder="Address" required />
          </div>
          <div class="mb-2">
            <input v-model="inputRegister.npk" type="text" class="form-control" placeholder="NPK" required />
          </div>
          <button type="submit" @click.prevent="doRegister" class="btn btn-primary">Register</button>
        </form>
      </div>
    </section>
</template>