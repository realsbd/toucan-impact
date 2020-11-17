<template>
<div>
    <!-- Page Content -->
    <div class="content">
        <!-- Full Table -->
        <base-block rounded title="Users">

            <div class="block block-rounded block-themed block-transparent mb-0">
                <b-form class="block-content font-size-sm" @submit="onSubmit">
                    <b-form-group label="First Name" label-for="First Name">
                        <b-form-input id="firstName" name="firstName" v-model="$v.form.first_name.$model" :state="!$v.form.first_name.$error && null" placeholder="First Name"></b-form-input>
                        <b-form-invalid-feedback id="first_name-feedback">
                            Please enter First Name
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Last Name" label-for="Last Name">
                        <b-form-input id="lastName" name="lastName" v-model="$v.form.last_name.$model" :state="!$v.form.last_name.$error && null" placeholder="Last Name"></b-form-input>
                        <b-form-invalid-feedback id="last_name-feedback">
                            Please enter Last Name
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Email" label-for="Add Email">
                        <b-form-input id="email" name="email" v-model="$v.form.email.$model" :state="!$v.form.email.$error && null" placeholder="Add Company Email"></b-form-input>
                        <b-form-invalid-feedback id="email-feedback">
                            Please enter email
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Password" label-for="Add Password">
                        <b-form-input id="password" name="password" v-model="$v.form.password.$model" :state="!$v.form.password.$error && null" type="password" placeholder="Password"></b-form-input>
                        <b-form-invalid-feedback id="password-feedback">
                            Please enter password
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <!-- <b-form-group>
                    <v-select multiple v-model="vSelectOptionsMultipleSelected" :options="vSelectOptionsMultiple" placeholder="Select user(s)"></v-select>
                  </b-form-group> -->
                    <b-form-group>
                        <b-button type="submit" size="sm" variant="primary">
                            Submit
                        </b-button>
                    </b-form-group>
                </b-form>
            </div>
        </base-block>
        <!-- END Full Table -->
    </div>
    <!-- END Page Content -->
</div>
</template>

<style lang="scss">
@import '~vue-select/src/scss/vue-select';
@import './src/assets/scss/vendor/vue-select';
</style>

<script>
// import VueSelect from 'vue-select'

import {
    mapGetters
} from 'vuex';

import {
    validationMixin
} from 'vuelidate'

import {
    required,
    email,
    minLength
} from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    components: {
        // 'v-select': VueSelect,
    },
    data() {
        return {
            form: {
                first_name: null,
                last_name: null,
                email: null,
                password: null
            }
        }
    },
    validations: {
        form: {
            first_name: {
                required,
                minLength: minLength(3)
            },
            last_name: {
                required,
                minLength: minLength(3)
            },
            email: {
                required,
                email,
                minLength: minLength(3)
            },
            password: {
                required,
                minLength: minLength(6)
            }
        }
    },
    computed: mapGetters(['users']),
    methods: {
        onSubmit(evt) {

            evt.preventDefault()

            this.$v.form.$touch()

            if (this.$v.form.$anyError) {
                return
            }

            let data = {
                first_name: this.form.first_name,
                last_name: this.form.last_name,
                email: this.form.email,
                password: this.form.password,
                id: this.$route.params.id,
            }

            this.$store
                .dispatch("updateUsers", data)
                .then(() => {
                    this.$router.push('/users')
                })
                .catch(err => console.log(err))
        }
    },
    mounted() {
        this.$store.dispatch("getUsersById", this.$route.params.id).then(resp => {
            this.form.first_name = resp.data.first_name
            this.form.last_name = resp.data.last_name
            this.form.email = resp.data.email
        }).catch(err => (console.log(err)))
    }
}
</script>
