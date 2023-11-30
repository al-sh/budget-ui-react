import{a as I,r as h,j as e,U as m,B as C,b as f,L as T}from"./index-34d4c4ba.js";import{u as p,T as b,C as E}from"./TransactionTypeSelect-df642144.js";import{F as v}from"./FormHeader-83de6a6f.js";import{F as s}from"./index-d9ae56b4.js";import{I as u}from"./index-56f64d49.js";import{C as y}from"./index-c8bada9e.js";import"./index-fb18f883.js";import"./useMergedState-79f96c76.js";import"./KeyCode-6413d982.js";import"./Select-b87e8223.js";const F=({category:t})=>{const{useUpdate:n,useDelete:a}=p(),r=n(t.id),i=a(t.id),o=I(),[l]=s.useForm(),d=t.typeId,[c,x]=h.useState(d);return e.jsxs("div",{children:[e.jsx(v,{text:"Редактирование категории",onDeleteButtonClick:()=>{confirm("Удалить категорию? При наличии транзакций категория будет скрыта.")&&(i.mutate(t.id),o(m.SETTINGS.CATEGORIES))}}),e.jsxs(s,{name:"basic",labelCol:{span:8},layout:"vertical",form:l,wrapperCol:{span:16},initialValues:{...t,isActive:t!=null&&t.id?t.isActive:!0,typeId:d},onValuesChange:()=>{x(l.getFieldValue("typeId"))},onFinish:j=>{r.mutate(j),o(m.SETTINGS.CATEGORIES)},autoComplete:"off",children:[e.jsx(s.Item,{label:"Название",name:"name",rules:[{message:"Введите название категории",required:!0}],children:e.jsx(u,{})}),e.jsx(s.Item,{label:"Тип",name:"typeId",rules:[{message:"Укажите тип категории",required:!0}],children:e.jsx(b,{hideReturns:!0,disabled:!0})}),e.jsx(s.Item,{label:"Родительская категория",name:"parentCategoryId",children:e.jsx(E,{typeId:c,allowClear:!0})}),e.jsx(s.Item,{label:"Порядок",name:"order",children:e.jsx(u,{type:"number"})}),e.jsx(s.Item,{name:"isActive",valuePropName:"checked",children:e.jsx(y,{children:"Активна"})}),e.jsx(s.Item,{wrapperCol:{offset:8,span:16},children:e.jsx(C,{type:"primary",htmlType:"submit",disabled:r.isLoading,children:"Сохранить"})})]}),r.isLoading&&e.jsx("div",{children:"Сохранение данных..."})]})},w=()=>{const{categoryId:t}=f(),{useGetOne:n}=p(),{isFetching:a,isError:r,data:i}=n(t||"");return e.jsxs(e.Fragment,{children:[a&&e.jsx(T,{}),r&&!a&&e.jsx("div",{children:"Ошибка загрузки категории"}),!a&&!r&&i&&e.jsx(F,{category:i})]})};export{w as CategoryDetailsPage,w as default};