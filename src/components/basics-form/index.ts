import {defineComponent, h} from "vue";
import useForm from "@/components/basics-form/useForm.vue";

export const useBasicsForm = () => {
    const Form = defineComponent(() => {
        return () =>
            h(useForm)
    })

    return [Form]
}