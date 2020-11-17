<template>
<div>
    <!-- Page Content -->
    <div class="content">
        <!-- Full Table -->
        <base-block rounded title="Create Impact Page">
            <div class="block-content font-size-sm">
                <form @submit.stop.prevent="onSubmit">
                    <base-block rounded>
                        <h1><small>1. Main Impact Information</small></h1>
                        <p>Fill in your basic information to let us know your preferences</p>
                        <b-row>
                            <b-col lg="4">
                                <b-form-group label="When was this Action?" label-for="action date">
                                    <flat-pickr id="action-date" class="form-control bg-white" md="6" xl="3" placeholder="Y-m-d" :state="!$v.form.impact_date.$error && null" v-model="$v.form.impact_date.$model"></flat-pickr>
                                </b-form-group>
                            </b-col>
                            <b-col lg="4">
                                <b-form-group label="Action by" label-for="action by">
                                    <v-select multiple v-model="$v.form.action_by.$model" :options="usersArray" placeholder="Select Users" :state="!$v.form.action_by.$error && null"></v-select>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-form-group label="Action Taken (summary)" label-for="action taken">
                            <ckeditor :editor="ckeditor" v-model="form.action_taken" :config="ckeditorConfig"></ckeditor>
                        </b-form-group>
                        <b-form-group label="Action Type" label-for="action type">
                            <v-select multiple v-model="form.action_type_id" :options="actionTypesArray" placeholder="select action types"></v-select>
                        </b-form-group>
                    </base-block>
                    <base-block rounded>
                        <h1><small>2. What's the story</small></h1>
                        <p>People here will get to know you with this information</p>
                        <b-form-group label="Is there any stroy that geos with this?" label-for="story">
                            <ckeditor :editor="ckeditor" v-model="form.story" :config="ckeditorConfig"></ckeditor>
                        </b-form-group>
                        <b-row>
                            <b-col lg="4">
                                <b-form-group label="Which country(s) did this impact?" label-for="countries">
                                    <v-select multiple v-model="form.country" :options="vSelectOptionsMultipleCountries" placeholder="Select Countries affected"></v-select>
                                </b-form-group>
                            </b-col>
                            <b-col lg="4">
                                <b-form-group label="Categories" label-for="Categories">
                                    <v-select multiple v-model="form.categories_id" :options="categoriesArray" placeholder="Select Categories"></v-select>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col lg="4">
                                <b-form-group label="Recipients" label-for="Recipients">
                                    <v-select multiple v-model="form.recipienttypes_id" :options="recipientsArray" placeholder="Select recipients type"></v-select>
                                </b-form-group>
                            </b-col>
                            <b-col lg="4">
                                <b-form-group label="Recipients Total" label-for="Recipients Total">
                                    <b-form-input id="recipientTotal" class="form-control-alt" placeholder="Recipients Total" v-model="form.recipient_total"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </base-block>
                    <base-block rounded>
                        <h1><small>3. Global Goals</small></h1>
                        <p>Select at least one global goal.</p>
                        <b-form-group label="Select at least one global goal." label-class="font-w600">
                            <b-form-checkbox-group v-model="form.globalgoal_id" :options="optionsCheckboxes" size="lg"></b-form-checkbox-group>
                        </b-form-group>
                    </base-block>
                    <base-block rounded>
                        <h1><small>4. Extras</small></h1>
                        <b-form-group label="Could this be done again?" label-class="font-w600">
                            <b-form-checkbox-group v-model="form.is_repeatable" :options="optionsRepeatable" switches stacked></b-form-checkbox-group>
                        </b-form-group>
                        <b-form-group label="Qoute or Testimony" label-for="Qoute">
                            <ckeditor :editor="ckeditor" v-model="form.quote" :config="ckeditorConfig"></ckeditor>
                        </b-form-group>
                        <b-form-group label="Source to reference e.g. B1G1" label-for="reference">
                            <ckeditor :editor="ckeditor" v-model="form.reference" :config="ckeditorConfig"></ckeditor>
                        </b-form-group>
                        <b-form-group label="Tags" label-for="Tags">
                            <v-select multiple v-model="form.impacttype_id" :options="tagsArray" placeholder="Select tags"></v-select>
                        </b-form-group>
                    </base-block>
                    <base-block rounded>
                        <h1><small>5. Learning and Amplyfing</small></h1>
                        <b-form-group label="Any Insights from this Impact?" label-for="Insights">
                            <ckeditor :editor="ckeditor" v-model="form.insight" :config="ckeditorConfig"></ckeditor>
                        </b-form-group>
                        <b-form-group label="How to improve" label-for="improvement">
                            <ckeditor :editor="ckeditor" v-model="form.how_to_improve" :config="ckeditorConfig"></ckeditor>
                        </b-form-group>
                        <b-form-group label="Reminder" label-for="Reminder">
                            <flat-pickr id="reminder" class="form-control bg-white" md="6" xl="3" placeholder="Y-m-d" v-model="form.follow_up"></flat-pickr>
                        </b-form-group>
                        <b-form-group label="Could this be made public?" label-class="font-w600">
                            <b-form-checkbox-group :options="optionsPublicRepeatable" switches></b-form-checkbox-group>
                        </b-form-group>
                        <b-form-group>
                            <b-button type="submit" size="sm" variant="primary">
                                Submit
                            </b-button>
                        </b-form-group>
                    </base-block>
                </form>
            </div>
        </base-block>
        <!-- END Full Table -->
    </div>
    <!-- END Page Content -->
</div>
</template>

<style lang="scss">
// Flatpickr + Custom overrides
@import '~flatpickr/dist/flatpickr.css';
@import './src/assets/scss/vendor/flatpickr';

// Vue Select + Custom overrides
@import '~vue-select/src/scss/vue-select';
@import './src/assets/scss/vendor/vue-select';

// CKEditor Custom overrides
@import './src/assets/scss/vendor/ckeditor';
</style>

<script>
// Flatpickr, for more info and examples you can check out https://github.com/ankurk91/vue-flatpickr-component
import flatPickr from 'vue-flatpickr-component'
// Vue Select, for more info and examples you can check out https://github.com/sagalbot/vue-select
import VueSelect from 'vue-select'

import CKEditor from '@ckeditor/ckeditor5-vue'
// You can import one of the following CKEditor variation (only one at a time)
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

// import {
//     mapGetters
// } from 'vuex';

import {
    validationMixin
} from 'vuelidate'

import {
    required
} from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    components: {
        flatPickr,
        'v-select': VueSelect,
        ckeditor: CKEditor.component,
    },
    data() {
        return {
            // Flatpickr initial values
            dateDefault: null,
            dateCustom: null,
            dateFriendly: null,
            dateRange: null,
            timeStandalone: null,
            timeStandalone24: null,
            timeDateTime: null,
            timeDateTime24: null,
            inlineDefault: null,
            inlineTime: null,

            // Flatpickr configuration, get more form https://chmln.github.io/flatpickr/options/
            configCustom: {
                dateFormat: 'd-m-Y'
            },
            configFriendly: {
                dateFormat: 'F j, Y'
            },
            configRange: {
                mode: 'range',
                minDate: 'today'
            },
            configTimeStandalone: {
                enableTime: true,
                noCalendar: true,
                dateFormat: 'H:i'
            },
            configTimeStandalone24: {
                enableTime: true,
                noCalendar: true,
                dateFormat: 'H:i',
                time_24hr: true
            },
            configDateTime: {
                enableTime: true
            },
            configDateTime24: {
                enableTime: true,
                time_24hr: true
            },
            configInlineDefault: {
                inline: true
            },
            configInlineTime: {
                inline: true,
                enableTime: true
            },

            vSelectOptionsMultipleSelected: null,
            actionTypesArray: [],
            usersArray: [],
            categoriesArray: [],
            recipientsArray: [],
            tagsArray: [],
            vSelectOptionsMultipleTagsSelected: null,
            vSelectOptionsMultipleCountries: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", ],
            vSelectOptionsMultipleCountriesSelected: null,

            ckeditorData: '<p>Hello CKEditor5!</p>',
            ckeditorConfig: {
                // The configuration of the editor
            },
            // Here we specify the editor you've imported before
            // ClassicEditor, InlineEditor, BalloonEditor, BalloonBlockEditor
            ckeditor: ClassicEditor,
            selectedCheckboxes: [],
            optionsCheckboxes: [{
                    value: 1,
                    html: '<img src="/img/global/g-1.png" class="img-fluid">'
                },
                {
                    value: 2,
                    html: '<img src="/img/global/g-2.png" class="img-fluid">'
                },
                {
                    value: 3,
                    html: '<img src="/img/global/g-3.png" class="img-fluid">'
                },
                {
                    value: 4,
                    html: '<img src="/img/global/g-4.png" class="img-fluid">'
                },
                {
                    value: 5,
                    html: '<img src="/img/global/g-3.png" class="img-fluid">'
                },
                {
                    value: 6,
                    html: '<img src="/img/global/g-1.png" class="img-fluid">'
                },
                {
                    value: 7,
                    html: '<img src="/img/global/g-2.png" class="img-fluid">'
                },
            ],
            selectedRepeatable: [],
            optionsRepeatable: [{
                value: 1,
                text: 'Yes'
            }],
            selectedPublicRepeatable: [],
            optionsPublicRepeatable: [{
                value: 1,
                text: 'Yes'
            }],
            form: {
                impact_date: '',
                action_by: '',
                action_taken: '',
                action_type_id: null,
                country: null,
                categories_id: null,
                recipienttypes_id: null,
                recipient_total: null,
                impacttype_id: null,
                globalgoal_id: null,
                made_public: "Yes",
                story: null,
                is_repeatable: null,
                quote: null,
                reference: null,
                insight: null,
                how_to_improve: null,
                follow_up: null
            },
        }
    },
    // computed: mapGetters(['actionTypesArray']),
    validations: {
        form: {
            impact_date: {
                required
            },
            action_by: {
                required
            }
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()

            this.$v.form.$touch()

            if (this.$v.form.$anyError) {
                console.log(1)
            }

            // const formData = new FormData()
            // formData.append('impact_date', this.form.impact_date)
            // formData.append('action_by', this.form.action_by)
            // formData.append('action_taken', this.form.action_taken)
            // formData.append('action_type_id', this.form.action_type_id)
            // formData.append('country', this.form.country)
            // formData.append('categories_id', this.form.categories_id)
            // formData.append('recipienttypes_id', this.form.recipienttypes_id)
            // formData.append('recipient_total', this.form.recipient_total)
            // formData.append('impacttype_id', this.form.impacttype_id)
            // formData.append('globalgoal_id', this.form.globalgoal_id)
            // formData.append('made_public', this.form.made_public)

            let data = {
                impact_date: this.form.impact_date,
                action_by: this.form.action_by,
                action_taken: this.form.action_taken,
                action_type_id: this.form.action_type_id,
                country: this.form.country,
                categories_id: this.form.categories_id,
                recipienttypes_id: this.form.recipienttypes_id,
                recipient_total: this.form.recipient_total,
                impacttype_id: this.form.impacttype_id,
                globalgoal_id: this.form.globalgoal_id,
                made_public: this.form.made_public,
                id: this.$route.params.id
            }

            this.$store
                .dispatch("updateImapct", data)
                .then(() => {
                    this.$router.push('/impact')
                })
                .catch(err => console.log(err))
        },
    },
    mounted() {
        document.addEventListener('keydown', this.eventHeaderSearch)
        // this.$store.dispatch("getactionTypesArray")
        this.$store.dispatch("getactionTypesArray").then(resp => {
            this.actionTypesArray = resp.data
        }).catch(err => (console.log(err)))

        this.$store.dispatch("getUsersArray").then(resp => {
            this.usersArray = resp.data
        }).catch(err => (console.log(err)))

        this.$store.dispatch("getcategoryArray").then(resp => {
            this.categoriesArray = resp.data
        }).catch(err => (console.log(err)))

        this.$store.dispatch("getrecipientsArray").then(resp => {
            this.recipientsArray = resp.data
        }).catch(err => (console.log(err)))

        this.$store.dispatch("gettagsArray").then(resp => {
            this.tagsArray = resp.data
        }).catch(err => (console.log(err)))

        this.$store.dispatch("getImapctById", this.$route.params.id).then(resp => {
            this.form.impact_date = resp.data.impact_date
            this.form.action_by = resp.data.action_by
            this.form.action_taken = resp.data.action_taken
            this.form.action_type_id = resp.data.action_type_id
            this.form.country = resp.data.country
            this.form.categories_id = resp.data.categories_id
            this.form.recipienttypes_id = resp.data.recipienttypes_id
            this.form.recipient_total = resp.data.recipient_total
            this.form.impacttype_id = resp.data.impacttype_id
            this.form.globalgoal_id = resp.data.globalgoal_id
            this.form.made_public = resp.data.made_public
        }).catch(err => (console.log(err)))
    }
}
</script>
