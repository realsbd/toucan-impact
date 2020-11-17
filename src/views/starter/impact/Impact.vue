<template>
<div>
    <!-- Page Content -->
    <div class="content">
        <!-- Full Table -->
        <base-block rounded title="Impact Page">
            <template #options>
                <!-- Size: Large -->
                <base-block rounded>
                    <router-link to="/impact-create">
                        <b-button variant="alt-primary" class="push" v-b-modal.modal-block-large>
                            Add New Impact
                        </b-button>
                    </router-link>
                </base-block>
                <!-- END Size: Large -->
            </template>
            <b-table-simple responsive bordered striped table-class="table-vcenter">
                <b-thead>
                    <b-tr>
                        <b-th>Action Date</b-th>
                        <b-th style="width: 30%;">Action by</b-th>
                        <b-th style="width: 30%;">Action type</b-th>
                        <b-th class="text-center" style="min-width: 110px; width: 110px;">Option</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="impact in impacts" :key="impact.id">
                        <b-td class="text-center">
                            {{ impact.impact_date }}
                        </b-td>
                        <b-td class="font-w600 font-size-sm">
                            <a>
                                {{ impact.action_by }}
                            </a>
                        </b-td>
                        <b-td class="font-size-sm">
                            {{ impact.action_type_id }}
                        </b-td>
                        <b-td class="text-center">
                            <b-btn-group>
                                <b-button size="sm" variant="alt-primary" :to="`impact/${impact.id}`">
                                    <i class="fa fa-fw fa-pencil-alt"></i>
                                </b-button>
                                <b-button size="sm" variant="alt-primary" @click.prevent="deleteItem(impact.id)">
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

</style>

<script>
// You can import one of the following CKEditor variation (only one at a time)
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import {
    mapGetters
} from 'vuex';

export default {
    components: {},
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

            vSelectOptionsMultiple: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Ruby', 'Angular', 'React', 'Vue.js'],
            vSelectOptionsMultipleSelected: null,
            vSelectOptionsMultipleTags: ['HTML', 'CSS', 'JavaScript', ],
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
            }]
        }
    },
    computed: mapGetters(['impacts']),
    methods: {
        onSubmit(evt) {
            evt.preventDefault()

            // Alert with form input values
            alert(JSON.stringify(this.form))
        },
    },
    mounted() {
        document.addEventListener('keydown', this.eventHeaderSearch)
        this.$store.dispatch("getImpacts")
    }
}
</script>
