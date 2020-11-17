<template>
<div>
    <!-- Page Content -->
    <div class="content">
        <!-- Full Table -->
        <base-block rounded title="Global Goal">
            <template #options>
                <!-- Default Variation -->
                <base-block rounded>
                    <b-button variant="alt-primary" class="push" v-b-modal.modal-block-normal>
                        Add New Global Goal
                    </b-button>
                </base-block>
                <!-- END Default Variation -->

                <!-- Normal Block Modal -->
                <b-modal id="modal-block-normal" body-class="p-0" hide-footer hide-header>
                    <div class="block block-rounded block-themed block-transparent mb-0">
                        <div class="block-header bg-primary-dark">
                            <h3 class="block-title">Add New Global Goal</h3>
                            <div class="block-options">
                                <button type="button" class="btn-block-option" @click="$bvModal.hide('modal-block-normal')">
                                    <i class="fa fa-fw fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <b-form class="block-content font-size-sm" @submit="onSubmit">
                            <b-form-group label="Upload Image" label-for="Upload Image">
                                <b-form-file id="globalImg" name="globalImg" plain v-model="$v.form.logo.$model" :state="!$v.form.logo.$error && null" @change="onFileUpload"></b-form-file>
                                <b-form-invalid-feedback id="logo-feedback">
                                    Please enter logo
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group label="Label" label-for="Add new Label">
                                <b-form-input id="label" name="label" v-model="$v.form.label.$model" :state="!$v.form.label.$error && null" placeholder="Add new Label"></b-form-input>
                                <b-form-invalid-feedback id="label-feedback">
                                    Please enter label
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group label="link" label-for="Add new link">
                                <b-form-input id="link" name="link" v-model="$v.form.link.$model" :state="!$v.form.link.$error && null" placeholder="Add new link"></b-form-input>
                                <b-form-invalid-feedback id="link-feedback">
                                    Please enter link
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group label="description" label-for="Add new description">
                                <b-form-input id="description" name="description" v-model="$v.form.description.$model" :state="!$v.form.description.$error && null" placeholder="Add new link"></b-form-input>
                                <b-form-invalid-feedback id="description-feedback">
                                    Please enter description
                                </b-form-invalid-feedback>
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
                        <b-th>Label</b-th>
                        <b-th style="width: 30%;">Link</b-th>
                        <b-th class="text-center" style="min-width: 110px; width: 110px;">Actions</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="globalGoal in globalGoals" :key="globalGoal.id">
                        <b-td class="text-center">
                            <img class="img-avatar img-avatar48" :src="globalGoal.logo" alt="Avatar">
                        </b-td>
                        <b-td class="font-w600 font-size-sm">
                            <a :href="`global/${globalGoal.id}`">
                                {{ globalGoal.label }}
                            </a>
                        </b-td>
                        <b-td class="font-size-sm">
                            <em class="text-muted">{{ globalGoal.link }}</em>
                        </b-td>
                        <b-td class="text-center">
                            <b-btn-group>
                                <b-button size="sm" variant="alt-primary" :to="`global/${globalGoal.id}`">
                                    <i class="fa fa-fw fa-pencil-alt"></i>
                                </b-button>
                                <b-button size="sm" variant="alt-primary" @click.prevent="deleteItem(globalGoal.id)">
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

<script>
import {
    mapGetters
} from 'vuex';

import {
    validationMixin
} from 'vuelidate'

import {
    required,
    url,
    minLength
} from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    data() {
        return {
            form: {
                logo: null,
                label: null,
                link: null,
                description: null,
            }
        }
    },
    validations: {
        form: {
            logo: {
                required
            },
            label: {
                required,
                minLength: minLength(1)
            },
            link: {
                required,
                url,
                minLength: minLength(3)
            },
            description: {
                required,
                minLength: minLength(3)
            }
        }
    },
    computed: mapGetters(['globalGoals']),
    methods: {
        onFileUpload(event) {
            this.form.logo = event.target.files[0]

        },
        onSubmit(evt) {
            evt.preventDefault()

            this.$v.form.$touch()

            if (this.$v.form.$anyError) {
                return
            }

            const formData = new FormData()
            formData.append('logo', this.form.logo, this.form.logo.name)
            formData.append('label', this.form.label)
            formData.append('link', this.form.link)
            formData.append('description', this.form.description)

            this.$store
                .dispatch("addGlobalgoal", formData)
                .then(() => {
                    this.$bvModal.hide("modal-block-normal")
                    this.$store.dispatch("getGlobalgoals")
                })
                .catch(err => console.log(err))
        },
        deleteItem(id) {
            if (confirm('Are you sure you want to delete this type?')) {
                this.$store
                    .dispatch("deleteGlobalgoal", id)
                    .then(() => {
                        this.$store.dispatch("getGlobalgoals")
                    })
                    .catch(err => console.log(err))
            }
        }
    },
    mounted() {
        this.$store.dispatch("getGlobalgoals")
    }
}
</script>
