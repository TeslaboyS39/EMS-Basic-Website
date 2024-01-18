<script>
export default {
    props: ['type', 'text']
}
</script>

<template>
    <button :type="type" class="btn btn-primary employee-add-button">{{text}}</button>
</template>