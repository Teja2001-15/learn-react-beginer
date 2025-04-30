import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const InquiryForm = () => {
  const formik = useFormik({
    initialValues: {
      inquiryType: '',
      carModel: '',
      budget: '',
      fullName: '',
      location: '',
      contactMethod: [],
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      message: '',
      referralSource: '',
    },
    validationSchema: Yup.object({
      inquiryType: Yup.string().required('Inquiry type is required'),
      carModel: Yup.string().min(2, 'Must be at least 2 characters').required('Car model is required'),
      fullName: Yup.string().min(3, 'Must be at least 3 characters').required('Full name is required'),
      location: Yup.string().required('Location is required'),
      contactMethod: Yup.array().min(1, 'At least one contact method is required'),
      email: Yup.string().when('contactMethod', {
        is: (val) => val.includes('Email'),
        then: Yup.string().email('Invalid email address').required('Email is required'),
      }),
      phone: Yup.string().when('contactMethod', {
        is: (val) => val.includes('Phone'),
        then: Yup.string().required('Phone number is required'),
      }),
      preferredDate: Yup.date().min(new Date(), 'Date cannot be in the past').required('Preferred date is required'),
      message: Yup.string().max(500, 'Message cannot exceed 500 characters'),
    }),
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Inquiry Type</label>
        <div className="flex">
          <label className="mr-4">
            <input
              type="radio"
              name="inquiryType"
              value="New"
              onChange={formik.handleChange}
              checked={formik.values.inquiryType === 'New'}
            />
            New
          </label>
          <label>
            <input
              type="radio"
              name="inquiryType"
              value="Used"
              onChange={formik.handleChange}
              checked={formik.values.inquiryType === 'Used'}
            />
            Used
          </label>
        </div>
        {formik.errors.inquiryType && formik.touched.inquiryType && (
          <div className="text-red-500">{formik.errors.inquiryType}</div>
        )}
      </div>

      <div className="mb-4 flex space-x-4">
  {/* Car Make & Model Input */}
  <div className="w-1/2">
    <label className="block text-gray-700">Car Make & Model</label>
    <input
      type="text"
      name="carModel"
      onChange={formik.handleChange}
      value={formik.values.carModel}
      className="w-full p-2 border border-gray-300 rounded"
    />
    {formik.errors.carModel && formik.touched.carModel && (
      <div className="text-red-500">{formik.errors.carModel}</div>
    )}
  </div>

  {/* Budget Range Input */}
  <div className="w-1/2">
    <label className="block text-gray-700">Budget Range</label>
    <select
      name="budget"
      onChange={formik.handleChange}
      value={formik.values.budget}
      className="w-full p-2 border border-gray-300 rounded"
    >
      <option value="">Select Budget</option>
      <option value="Under ₹2,00,0000">Under ₹2,00,000</option>
      <option value="₹2,00,000 - ₹4,00,000">₹2,00,000 - ₹4,00,000</option>
      <option value="Over ₹4,00,000">Over ₹4,00,000</option>
    </select>
  </div>
</div>

<div className="mb-4 flex space-x-4">
  {/* Full Name Input */}
  <div className="w-1/2">
    <label className="block text-gray-700">Full Name</label>
    <input
      type="text"
      name="fullName"
      onChange={formik.handleChange}
      value={formik.values.fullName}
      className="w-full p-2 border border-gray-300 rounded"
    />
    {formik.errors.fullName && formik.touched.fullName && (
      <div className="text-red-500">{formik.errors.fullName}</div>
    )}
  </div>

  {/* Location Input */}
  <div className="w-1/2">
    <label className="block text-gray-700">Location</label>
    <input
      type="text"
      name="location"
      onChange={formik.handleChange}
      value={formik.values.location}
      className="w-full p-2 border border-gray-300 rounded"
    />
    {formik.errors.location && formik.touched.location && (
      <div className="text-red-500">{formik.errors.location}</div>
    )}
  </div>
</div>

      <div className="mb-4">
        <label className="block text-gray-700">Preferred Contact Method</label>
        <div className="flex">
          <label className="mr-4">
            <input
              type="checkbox"
              name="contactMethod"
              value="Email"
              onChange={formik.handleChange}
              checked={formik.values.contactMethod.includes('Email')}
            />
            Email
          </label>
          <label>
            <input
              type="checkbox"
              name="contactMethod"
              value="Phone"
              onChange={formik.handleChange}
              checked={formik.values.contactMethod.includes('Phone')}
            />
            Phone
          </label>
        </div>
        {formik.errors.contactMethod && formik.touched.contactMethod && (
          <div className="text-red-500">{formik.errors.contactMethod}</div>
        )}
      </div>

      {formik.values.contactMethod.includes('Email') && (
        <div className="mb-4">
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500">{formik.errors.email}</div>
          )}
        </div>
      )}

      {formik.values.contactMethod.includes('Phone') && (
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className="text-red-500">{formik.errors.phone}</div>
          )}
        </div>
      )}

<div className="mb-4 flex space-x-4">
  {/* Preferred Contact Date Input */}
  <div className="w-1/2">
    <label className="block text-gray-700">Preferred Contact Date</label>
    <input
      type="date"
      name="preferredDate"
      onChange={formik.handleChange}
      value={formik.values.preferredDate}
      className="w-full p-2 border border-gray-300 rounded"
    />
    {formik.errors.preferredDate && formik.touched.preferredDate && (
      <div className="text-red-500">{formik.errors.preferredDate}</div>
    )}
  </div>

  {/* Preferred Contact Time Input */}
  <div className="w-1/2">
    <label className="block text-gray-700">Preferred Contact Time</label>
    <input
      type="time"
      name="preferredTime"
      onChange={formik.handleChange}
      value={formik.values.preferredTime}
      className="w-full p-2 border border-gray-300 rounded"
    />
  </div>
</div>

      <div className="mb-4">
        <label className="block text-gray-700">Message or Questions</label>
        <textarea
          name="message"
          onChange={formik.handleChange}
          value={formik.values.message}
          className="w-full p-2 border border-gray-300 rounded"
          maxLength="500"
        />
        {formik.errors.message && formik.touched.message && (
          <div className="text-red-500">{formik.errors.message}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">How did you hear about us?</label>
        <select
          name="referralSource"
          onChange={formik.handleChange}
          value={formik.values.referralSource}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Source</option>
          <option value="Internet">Internet</option>
          <option value="Friend">Friend</option>
          <option value="Advertisement">Advertisement</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
        <button type="reset"
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
                onClick={formik.handleReset}>
                Reset
              </button>
            </div>
          </form>
        );
      };
      
      export default InquiryForm;
      