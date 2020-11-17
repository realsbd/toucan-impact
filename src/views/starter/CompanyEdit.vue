<template>
<div>
    <!-- Page Content -->
    <div class="content">
        <!-- Full Table -->
        <base-block rounded title="Companies">
            <div class="block block-rounded block-themed block-transparent mb-0">
                <b-form class="block-content font-size-sm" @submit="onSubmit">
                    <b-form-group label="Upload Image" label-for="Upload Image">
                        <b-form-file id="logo" name="logo" plain @change="onFileUpload"></b-form-file>
                    </b-form-group>
                    <b-form-group label="Company" label-for="Company Name">
                        <b-form-input id="name" name="name" v-model="$v.form.name.$model" :state="!$v.form.name.$error && null" placeholder="Company Name"></b-form-input>
                        <b-form-invalid-feedback id="name-feedback">
                            Please enter company name
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Email" label-for="Add Email">
                        <b-form-input id="email" name="email" v-model="$v.form.email.$model" :state="!$v.form.email.$error && null" placeholder="Add Company Email"></b-form-input>
                        <b-form-invalid-feedback id="email-feedback">
                            Please enter company email
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Website" label-for="Add Website">
                        <b-form-input id="website" name="website" v-model="$v.form.website.$model" :state="!$v.form.website.$error && null" placeholder="Add Company Website"></b-form-input>
                        <b-form-invalid-feedback id="website-feedback">
                            Please enter Company website
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group>
                        <v-select multiple v-model="form.users" :options="usersArray.first_name" placeholder="Select user(s)"></v-select>
                    </b-form-group>
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
import VueSelect from 'vue-select'

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

import axios from "axios"

export default {
    mixins: [validationMixin],
    components: {
        'v-select': VueSelect,
    },
    data() {
        return {
            // vSelectOptionsMultiple: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Ruby', 'Angular', 'React', 'Vue.js'],
            // vSelectOptionsMultipleSelected: null,
            logo: null,
            form: {
                name: '',
                email: '',
                website: '',
                users: null,
            },
            usersArray: [],
            usersArraySelected: null,
        }
    },
    validations: {
        form: {
            name: {
                required,
                minLength: minLength(3)
            },
            email: {
                required,
                email,
                minLength: minLength(3)
            },
            website: {
                required,
                minLength: minLength(3)
            }
        }
    },
    computed: mapGetters(['companies']),
    methods: {
        onFileUpload(event) {
            this.logo = event.target.files[0]
        },
        onSubmit(evt) {
            evt.preventDefault()

            this.$v.form.$touch()

            if (this.$v.form.$anyError) {
                return
            }

            let data = {
                name: this.form.name,
                email: this.form.email,
                website: this.form.website,
                users: this.form.users,
                id: this.$route.params.id
            }

            console.log(data);

            this.$store
                .dispatch("updateCompanies", data)
                .then(() => {
                    this.$router.push('/company')
                })
                .catch(err => console.log(err))
        }
    },
    mounted() {
        this.$store.dispatch("getCompaniesById", this.$route.params.id).then(resp => {
            this.form.name = resp.data.name
            this.form.email = resp.data.email
            this.form.website = resp.data.website
            // this.usersArraySelected = resp.data.user_company
        }).catch(err => (console.log(err)))

        axios.get("https://api.toucanimpact.com/api/users")
        .then(response => (this.usersArray = response.data))
        .catch(error => console.log(error))
            
        // this.$store
        //     .dispatch("getUsers")
        //     .then(resp => {
        //         this.usersArray = resp.data.first_name
        //         console.log(resp.data.first_name); 
        //     })
        //     .catch(err => (console.log(err)))
    }
}
</script>
