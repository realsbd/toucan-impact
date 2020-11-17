<template>
<div>
    <!-- Page Content -->
    <div class="content">
        <!-- Full Table -->
        <base-block rounded title="Global Goal">
            <div class="block block-rounded block-themed block-transparent mb-0">
                <b-form class="block-content font-size-sm" @submit="onSubmit">
                    <b-form-group label="Upload Image" label-for="Upload Image">
                        <b-form-file id="globalImg" name="globalImg" plain v-model="form.logo" @change="onFileUpload"></b-form-file>
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

            let data = {
                label: this.form.label,
                link: this.form.link,
                description: this.form.description,
                id: this.$route.params.id
            }

            this.$store
                .dispatch("updateGlobalgoal", data)
                .then(() => {
                    this.$router.push('/global')
                })
                .catch(err => console.log(err))
        }
    },
    mounted() {
        this.$store.dispatch("getGlobalgoalById", this.$route.params.id).then(resp => {
            this.form.label = resp.data.label
            this.form.link = resp.data.link
            this.form.description = resp.data.description
        }).catch(err => (console.log(err)))
    }
}
</script>
