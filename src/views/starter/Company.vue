<template>
<div>
    <!-- Page Content -->
    <div class="content">
        <!-- Full Table -->
        <base-block rounded title="Companies">
            <template #options>
                <!-- Default Variation -->
                <base-block rounded>
                    <b-button variant="alt-primary" class="push" v-b-modal.modal-block-normal>
                        Add New Company
                    </b-button>
                </base-block>
                <!-- END Default Variation -->

                <!-- Normal Block Modal -->
                <b-modal id="modal-block-normal" body-class="p-0" hide-footer hide-header>
                    <div class="block block-rounded block-themed block-transparent mb-0">
                        <div class="block-header bg-primary-dark">
                            <h3 class="block-title">Add New Company</h3>
                            <div class="block-options">
                                <button type="button" class="btn-block-option" @click="$bvModal.hide('modal-block-normal')">
                                    <i class="fa fa-fw fa-times"></i>
                                </button>
                            </div>
                        </div>
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
                                    Please enter Compnay website
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group>
                                <v-select multiple v-model="form.users" :options="usersArray" placeholder="Select user(s)"></v-select>
                            </b-form-group>
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
                        <b-th class="text-center" style="width: 100px;">
                            <i class="far fa-user"></i>
                        </b-th>
                        <b-th>Name</b-th>
                        <b-th style="width: 30%;">Email</b-th>
                        <b-th style="width: 15%;">Website</b-th>
                        <b-th style="width: 15%;">Users</b-th>
                        <b-th class="text-center" style="min-width: 110px; width: 110px;">Actions</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="company in companies" :key="company.id">
                        <b-td class="text-center">
                            <img class="img-avatar img-avatar48" :src="company.logo" alt="Avatar">
                        </b-td>
                        <b-td class="font-w600 font-size-sm">
                            <a :href="`${company.website}`">
                                {{ company.name }}
                            </a>
                        </b-td>
                        <b-td class="font-size-sm">
                            <em class="text-muted">{{ company.email }}</em>
                        </b-td>
                        <b-td>
                            {{ company.website }}
                        </b-td>
                        <b-td>
                            {{ company.user_company }}

                            <!-- <b-badge :variant="company.labelVariant">{{ company.labelText }}</b-badge> -->
                        </b-td>
                        <b-td class="text-center">
                            <b-btn-group>
                                <b-button size="sm" variant="alt-primary" :to="`company/${company.id}`">
                                    <i class="fa fa-fw fa-pencil-alt"></i>
                                </b-button>
                                <b-button size="sm" variant="alt-primary" @click.prevent="deleteItem(company.id)">
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

export default {
    mixins: [validationMixin],
    components: {
        'v-select': VueSelect,
    },
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            let data = value.filter(function (e) {
                return e.user_id
            })
            return data
        }
    },
    data() {
        return {
            vSelectOptionsMultiple: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Ruby', 'Angular', 'React', 'Vue.js'],
            vSelectOptionsMultipleSelected: null,
            logo: null,
            form: {
                name: '',
                email: '',
                website: '',
                users: null,
            },
            usersArray: []
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

            const formData = new FormData()
            formData.append('logo', this.logo, this.logo.name)
            formData.append('name', this.form.name)
            formData.append('email', this.form.email)
            formData.append('website', this.form.website)
            formData.append('users', this.form.users)

            this.$store
                .dispatch("addCompany", formData)
                .then(() => {
                    this.$bvModal.hide("modal-block-normal")
                    this.$store.dispatch("getCompanies")
                })
                .catch(err => console.log(err))
        },
        deleteItem(id) {
            if (confirm('Are you sure you want to delete this type?')) {
                this.$store
                    .dispatch("deleteCompany", id)
                    .then(() => {
                        this.$store.dispatch("getCompanies")
                    })
                    .catch(err => console.log(err))
            }
        }
    },
    mounted() {
        this.$store.dispatch("getCompanies")

        this.$store
            .dispatch("getUsersArray")
            .then(resp => {
                this.usersArray = resp.data
            })
            .catch(err => (console.log(err)))
    }
}
</script>