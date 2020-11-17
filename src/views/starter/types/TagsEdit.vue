<template>
<div>
    <!-- Page Content -->
    <div class="content">
        <!-- Full Table -->
        <base-block rounded title="Edit Tags">
            <div class="block block-rounded block-themed block-transparent mb-0">
                <b-form class="block-content font-size-sm" @submit="onSubmit">

                    <b-form-group label="Label" label-for="Label">
                        <b-form-input id="label" name="label" v-model="$v.form.label.$model" :state="!$v.form.label.$error && null" placeholder="label"></b-form-input>
                        <b-form-invalid-feedback id="label-feedback">
                            Please enter label
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Company" label-for="Company Name">
                        <select name="companies_id" id="" v-model="form.companies_id">
                            <option :value="index" v-for="(item, index) in companiesArray" :key="index">
                                {{item}}
                            </option>
                        </select>

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
import {
    mapGetters
} from 'vuex';

import {
    validationMixin
} from 'vuelidate'

import {
    required,
    minLength
} from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],

    data() {
        return {
            vSelectOptionsMultipleSelected: null,
            logo: null,
            form: {
                label: '',
                companies_id: ''
            },
            companiesArray: []
        }
    },
    validations: {
        form: {
            label: {
                required,
                minLength: minLength(3)
            },
            companies_id: {
                required
            }
        }
    },
    computed: mapGetters(['tags']),
    methods: {
        onSubmit(evt) {
            evt.preventDefault()

            this.$v.form.$touch()

            if (this.$v.form.$anyError) {
                return
            }

            let data = {
                label: this.form.label,
                companies_id: this.form.companies_id,
                id: this.$route.params.id
            }

            this.$store
                .dispatch("updatetags", data)
                .then(() => {
                    this.$router.push('/tags')
                })
                .catch(err => console.log(err))
        }
    },
    mounted() {
        this.$store.dispatch("gettagsById", this.$route.params.id).then(resp => {
            this.form.label = resp.data.label
        }).catch(err => (console.log(err)))

        this.$store
            .dispatch("getCompaniesArray")
            .then(resp => {
                this.companiesArray = resp.data
            })
            .catch(err => (console.log(err)))
    }
}
</script>
