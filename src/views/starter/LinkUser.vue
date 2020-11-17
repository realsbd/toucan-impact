<template>
<div>
    <!-- Hero -->
    <base-page-heading title="Link User to Company" subtitle="Select a company and link users to the company">
    </base-page-heading>
    <!-- END Hero -->

    <!-- Page Content -->
    <div class="content">
        <!-- Vue Select -->
        <base-block rounded title="Vue Select">
            <b-form @submit="onSubmit">
                <!-- Normal Select Box -->
                <h2 class="content-heading border-bottom mb-4 pb-2">Select Company</h2>
                <b-row>
                    <b-col lg="8" xl="4">
                        <b-form-group>
                            <v-select v-model="companiesArraySelected" :options="companiesArray" placeholder="Choose a value.."></v-select>
                        </b-form-group>
                    </b-col>
                </b-row>
                <!-- END Normal Select Box -->

                <!-- Multiple Select Box -->
                <h2 class="content-heading border-bottom mb-4 pb-2">Select Users</h2>
                <b-row>
                    <b-col lg="8" xl="4">
                        <b-form-group>
                            <v-select multiple v-model="usersArraySelected" :options="usersArray" placeholder="You can select multiple users"></v-select>
                        </b-form-group>
                    </b-col>
                </b-row>
                <!-- END Multiple Select Box -->
                <b-form-group>
                    <b-button type="submit" size="sm" variant="primary">
                        Submit
                    </b-button>
                </b-form-group>
            </b-form>
        </base-block>
        <!-- END Vue Select -->
    </div>
    <!-- END Page Content -->
</div>
</template>

<style lang="scss">
// Vue Select + Custom overrides
@import '~vue-select/src/scss/vue-select';
@import './src/assets/scss/vendor/vue-select';
</style>

<script>
// Vue Select, for more info and examples you can check out https://github.com/sagalbot/vue-select
import VueSelect from 'vue-select'

// import axios from 'axios';

import {
    validationMixin
} from 'vuelidate'

import {
    required
} from 'vuelidate/lib/validators'

// import axios from "axios"

export default {
    mixins: [validationMixin],

    components: {
        'v-select': VueSelect,
    },
    data() {
        return {
            companiesArray: ['COMPANY 1', 'COMPANY 2', 'COMPANY 3', 'COMPANY 4', 'COMPANY 5'],
            companiesArraySelected: null,
            usersArray: ['USER 1', 'USER 2', 'USER 3', 'USER 4', 'USER 5', 'USER 6'],
            usersArraySelected: null,
            form: {
                company_id: '',
                user_id: []
            },
        }
    },
    validations: {
        companiesArraySelected: {
            required
        },
        usersArraySelected: {
            required
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()

            // this.$v.form.$touch()

            // if (this.$v.form.$anyError) {
            //     return
            // }

            let data = {
                company_id: this.companiesArraySelected,
                user_id: this.usersArraySelected
            }

            this.$store
                .dispatch("addLinkUser", data)
                .then(() => {
                    this.$router.push("/company")
                })
                .catch(err => console.log(err))
        },
    },
    mounted() {

        // axios.get("https://api.toucanimpact.com/api/users-to-array/")
        // .then(response => (this.usersArray = response.data))
        // .catch(error => console.log(error))

        this.$store.dispatch("getUsersArray").then(resp => {
            this.usersArray = resp.data
        }).catch(err => (console.log(err)))

        this.$store.dispatch("getCompaniesArray").then(resp => {
            this.companiesArray = resp.data
        }).catch(err => (console.log(err)))
    }
}
</script>
