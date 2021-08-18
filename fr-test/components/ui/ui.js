import Vue from 'vue';

/**
 * Импорт компонентов
 **/
import VButton from './button/VButton';
import VInput from './input/VInput';
import VSelect from '@/components/ui/select/VSelect';

const components = [
    VButton,
    VInput,
    VSelect,
];


/**
 * Регистрация компонентов.
 * Теперь можно их использовать в любом vue-шаблоне
 **/
components.forEach(component => {
    if (component.name) {
        Vue.component(component.name, component);
    } else {
        console.warn('[UI] Register / No component name: ', component);
    }
});
