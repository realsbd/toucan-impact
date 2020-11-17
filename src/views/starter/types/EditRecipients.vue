<template>
<div>
    <!-- Page Content -->
    <div class="content">
        <!-- Full Table -->
        <base-block rounded title="Recipient Type">
        {{ rec }}
            <template #options>
                <!-- Default Variation -->
                <base-block rounded>
                    <b-button variant="alt-primary" class="push">
                        Go back
                    </b-button>
                </base-block>
            </template>
            <b-form class="block-content font-size-sm" @submit="onSubmit">
                <b-form-group label="Recipient" label-for="Add new Recipient">
                    <b-form-input id="recipient" name="recipient" :state="!$v.form.label.$error && null" placeholder="Add new Recipient"></b-form-input>
                    <b-form-invalid-feedback id="label-feedback">
                        Please enter Recipient
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group>
                    <b-button type="submit" size="sm" variant="primary">
                        Submit
                    </b-button>
                </b-form-group>
            </b-form>
            <!-- <b-table-simple responsive bordered striped table-class="table-vcenter">
                <b-thead>
                    <b-tr>
                        <b-th>Recipients</b-th>
                        <b-th class="text-center" style="min-width: 110px; width: 110px;">Actions</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="recipient in recipients" :key="recipient.id">
                        <b-td class="font-w600 font-size-sm">
                            <a :href="`${recipient.id}`">
                                {{ recipient.label }}
                            </a>
                        </b-td>
                        <b-td class="text-center">
                            <b-btn-group>
                                <b-button size="md" variant="alt-primary">
                                    <i class="fa fa-fw fa-pencil-alt"></i>
                                </b-button>
                                <b-button size="md" variant="alt-primary" @click.prevent="deleteItem(recipient.id)">
                                    <i class="fa fa-fw fa-times"></i>
                                </b-button>
                            </b-btn-group>
                        </b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple> -->
        </base-block>
        <!-- END Full Table -->

    </div>
    <!-- END Page Content -->
</div>
</template>

<script>
// import axios from "axios"

// import {
//     mapGetters
// } from 'vuex';

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
            recipients: null,
            // form: {
            //     label: null
            // }
            router: this.$route.params.recipientid,
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
    computed: {
        // rec() {
        //     return this.$route.params.id
        // }
    },
    methods: {
        async getRecipients() {
            this.$store
                    .dispatch("getrecipients")
                    .find(
                        (recipient) => recipient.objectId == this.router
                    )
                    // .then(() => {
                    //     this.$store.dispatch("getrecipients")
                    // })
                    .catch(err => console.log(err))
        }
        // onSubmit(evt) {
        //     evt.preventDefault()

        //     this.$v.form.$touch()

        //     if (this.$v.form.$anyError) {
        //         return
        //     }

        //     let data = {
        //         label: this.form.label,
        //     }

        //     this.$store
        //         .dispatch("updaterecipient", data)
        //         .catch(err => console.log(err))
        // },
        // deleteItem(id) {
        //     if (confirm('Are you sure you want to delete this recipient?')) {
        //         this.$store
        //             .dispatch("deleterecipient", id)
        //             .then(() => {
        //                 this.$store.dispatch("getrecipients")
        //             })
        //             .catch(err => console.log(err))
        //     }
        // }
    },
    mounted() {
        // axios.get("https://api.toucanimpact.com/api/recipient/:id")
        //     .then(response => (this.rec = response))
        this.$store.dispatch("getrecipients")
    }
}
</script>
