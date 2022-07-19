import React from "react";
import { Formik, Form, useField } from "formik";
import * as yup from "yup";

const MyInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form__group field">
      <label className="form__label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input className="form__field" {...field} {...props} id={props.name} />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form__group field">
      <label htmlFor={props.id || props.name} className="form__label">
        {label}
      </label>
      <select id={props.name} className="form__field" {...field} {...props} />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};

const MyCheckBox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  console.log(children);
  return (
    <div className="form__group field">
      <label htmlFor={props.id || props.name} className="form__label">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};

const Layout = () => {
  return (
    <div className="container">
      <div className="main__app">
        <h2 className="title">Demo Formik</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: null,
            linkFb: "",
            skill: "",
            check: false,
          }}
          validationSchema={yup.object({
            firstName: yup
              .string()
              .max(15, "Chỉ được 15 ký tự hoặc thấp hơn")
              .required("Bắt buộc nhập"),
            lastName: yup
              .string()
              .max(15, "Chỉ được 15 ký tự hoặc thấp hơn")
              .required("Bắt buộc nhập"),
            email: yup
              .string()
              .email("Sai cấu trúc email")
              .required("Bắt buộc nhập"),
            phone: yup
              .number()
              .min(10, "Số điện thoại ít nhất 10 số")
              .nullable()
              .typeError("Bạn chỉ có thể nhập số")
              .required("Bắt buộc nhập"),
            linkFb: yup
              .string()
              .url("Giá trị phải là liên kết")
              .required("Bắt buộc nhập"),
            skill: yup
              .string()
              .oneOf(
                ["Javascript", "ReactJs", "Angular", "PHP"],
                "Giá trị bạn vừa chọn không đúng"
              )
              .required("Bắt buộc chọn"),
            check: yup
              .boolean()
              .oneOf([true], "Vui lòng tích vào ô chọn")
              .required("Bắt buộc chọn"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <MyInput
              label="Họ"
              name="firstName"
              type="text"
              placeholder="Nhập họ của bạn"
            />
            <MyInput
              label="Tên"
              name="lastName"
              type="text"
              placeholder="Nhập tên của bạn"
            />
            <MyInput
              label="Email"
              name="email"
              type="email"
              placeholder="Nhập email của bạn"
            />
            <MyInput
              label="Số điện thoại"
              name="phone"
              type="text"
              placeholder="Nhập số điện thoại của bạn"
            />
            <MyInput
              label="Link Facebook"
              name="linkFb"
              type="text"
              placeholder="Đường dẫn đến Facebook của bạn"
            />
            <MySelect label="Ngôn ngữ đã học" name="skill">
              <option value="Javascript">Javascript</option>
              <option value="ReactJs">ReactJs</option>
              <option value="Angular">Angular</option>
              <option value="PHP">PHP</option>
            </MySelect>

            <MyCheckBox name="check">Tôi đồng ý với điều khoản</MyCheckBox>

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Layout;
