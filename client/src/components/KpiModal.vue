<script>
export default {
    data() {
        return {
            daysPresent: null,
            totalWorkDays: null,
            totalSold: null,
            totalTargetSold: null,
            numberOfNoSeriousComplain: null,
            totalCustomer: null,
            kpi: null,
            selectedCategory: 'attendanceRate',
            inputValue1: null,
            inputValue2: null,
        };
    },

    methods: {
        resetValues() {
            this.kpi = null;
            this.inputValue1 = null;
            this.inputValue2 = null;
        },
        calculate() {
            switch (this.selectedCategory) {
                case 'attendanceRate':
                    this.kpi = parseFloat((this.inputValue1 / this.inputValue2) * 100);
                    break;
                case 'salesPerEmployee':
                    this.kpi = parseFloat((this.inputValue1 / this.inputValue2) * 100);
                    break;
                case 'customerSatisfaction':
                    this.kpi = parseFloat((this.inputValue1 / this.inputValue2) * 100);
                    break;
                default:
                    break;
            }
        },
        close() {
            this.$emit('close');
        },
        addKpiToEmployee() {
            this.kpi = parseFloat(this.kpi.toFixed(2));
            this.$emit('applyKPI', this.kpi);
            this.close();
        },
    },

    computed: {
        parameterLabel1() {
            switch (this.selectedCategory) {
                case 'attendanceRate':
                    return 'Days Present';
                case 'salesPerEmployee':
                    return 'Total Sold';
                case 'customerSatisfaction':
                    return 'Number of No Serious Complain';
                default:
                    return '';
            }
        },
        parameterLabel2() {
            switch (this.selectedCategory) {
                case 'attendanceRate':
                    return 'Total Work Days';
                case 'salesPerEmployee':
                    return 'Total Target Sold';
                case 'customerSatisfaction':
                    return 'Total Customer';
                default:
                    return '';
            }
        },
    },
};
</script>

<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <h3>Calculate KPI</h3>

            <div class="input-container">
                <label>{{ parameterLabel1 }}:</label>
                <input v-model="inputValue1" type="number" />
            </div>

            <div class="input-container">
                <label>{{ parameterLabel2 }}:</label>
                <input v-model="inputValue2" type="number" />
            </div>

            <div class="input-container">
                <label>KPI Category:</label>
                <select v-model="selectedCategory" @change="resetValues">
                    <option value="attendanceRate">Attendance Rate</option>
                    <option value="salesPerEmployee">Sales per Employee</option>
                    <option value="customerSatisfaction">Customer Satisfaction</option>
                </select>
            </div>

            <button @click="calculate">Calculate</button>

            <div v-if="kpi !== null" class="result-container">
                <span>{{ selectedCategoryLabel }}:</span>
                <span>{{ kpi }}%</span>
                <button @click="addKpiToEmployee">➕</button>
            </div>

            <button @click="close" class="close-button">Close</button>
        </div>
    </div>
</template>

<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
}

.input-container {
    margin-bottom: 15px;
}

input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #4caf50;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button.close-button {
    background-color: #f44336;
    margin-top: 10px;
}

.result-container {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
}
</style>

