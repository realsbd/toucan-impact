<template>
<div>
    <!-- Page Content -->
    <div class="content">
        <!-- Full Table -->
        <base-block rounded title="Users">
            <template #options>
                <!-- Default Variation -->
                <base-block rounded>
                    <b-button variant="alt-primary" class="push" v-b-modal.modal-block-normal>
                        Add New User
                    </b-button>
                </base-block>
                <!-- END Default Variation -->

                <!-- Normal Block Modal -->
                <b-modal id="modal-block-normal" body-class="p-0" hide-footer hide-header>
                    <div class="block block-rounded block-themed block-transparent mb-0">
                        <div class="block-header bg-primary-dark">
                            <h3 class="block-title">Add New User</h3>
                            <div class="block-options">
                                <button type="button" class="btn-block-option" @click="$bvModal.hide('modal-block-normal')">
                                    <i class="fa fa-fw fa-times"></i>
                                </button>
                            </div>
                        </div>
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
                </b-modal>
                <!-- END Normal Block Modal -->
            </template>
            <b-table-simple responsive bordered striped table-class="table-vcenter">
                <b-thead>
                    <b-tr>
                        <b-th>First Name</b-th>
                        <b-th>Last Name</b-th>
                        <b-th style="width: 30%;">Email</b-th>
                        <b-th class="text-center" style="min-width: 110px; width: 110px;">Actions</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="user in users" :key="user.id">
                        <b-td class="font-w600 font-size-sm">
                            {{ user.first_name }}
                        </b-td>
                        <b-td class="font-w600 font-size-sm">
                            {{ user.last_name }}
                        </b-td>
                        <b-td class="font-w600 font-size-sm">
                            {{ user.email }}
                        </b-td>
                        <b-td class="text-center">
                            <b-btn-group>
                                <b-button size="sm" variant="alt-primary" :to="`users/${user.id}`">
                                    <i class="fa fa-fw fa-pencil-alt"></i>
                                </b-button>
                                <b-button size="sm" variant="alt-primary" @click.prevent="deleteItem(user.id)">
                                    <i class="fa fa-fw fa-times"></i>
                                </b-button>
                            </b-btn-group>
                        </b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
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
                password: this.form.password
            }

            this.$store
                .dispatch("addUser", data)
                .then(() => {
                    this.$bvModal.hide("modal-block-normal")
                    this.$store.dispatch("getUsers")
                })
                .catch(err => console.log(err))

            // Alert with form input values
            // alert(JSON.stringify(this.form))
        },
        deleteItem(id) {
            if (confirm('Are you sure you want to delete this type?')) {
                this.$store
                    .dispatch("deleteUser", id)
                    .then(() => {
                        this.$store.dispatch("getUsers")
                    })
                    .catch(err => console.log(err))
            }
        }
    },
    mounted() {
        this.$store.dispatch("getUsers")
    }
}
</script>
