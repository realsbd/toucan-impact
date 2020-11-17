<template>
<div>
    <!-- Page Content -->
    <div class="content">
        <!-- Full Table -->
        <base-block rounded title="Categories Types">
            <div class="block block-rounded block-themed block-transparent mb-0">
                <b-form class="block-content font-size-sm" @submit="onSubmit">
                    <b-form-group label="Categories Type" label-for="Add new Categories Type">
                        <b-form-input id="categoriesType" name="categoriesType" v-model="$v.form.label.$model" :state="!$v.form.label.$error && null" placeholder="Add new Categories Type"></b-form-input>
                        <b-form-invalid-feedback id="label-feedback">
                            Please enter category
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
    minLength
} from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    data() {
        return {
            form: {
                label: null
            }
        }
    },
    validations: {
        form: {
            label: {
                required,
                minLength: minLength(3)
            }
        }
    },
    computed: mapGetters(['categoriesTypes']),
    methods: {
        onSubmit(evt) {
            evt.preventDefault()

            this.$v.form.$touch()

            if (this.$v.form.$anyError) {
                return
            }

            let data = {
                label: this.form.label,
                id: this.$route.params.id
            }

            this.$store
                .dispatch("updatecategoryType", data)
                .then(() => {
                    this.$router.push('/categories')
                })
                .catch(err => console.log(err))
        }
    },
    mounted() {
        this.$store.dispatch("getcategoryTypeById", this.$route.params.id).then(resp => {
            this.form.label = resp.data.label
        }).catch(err => (console.log(err)))
    }
}
</script>
