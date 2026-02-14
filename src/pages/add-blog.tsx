import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RiArrowLeftSLine } from 'react-icons/ri';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Image from "next/image"

const AddBlog = () => {
  const router = useRouter();
  const { id } = router.query;
  const isEditMode = Boolean(id);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState('');
  // const [coverFile, setCoverFile] = useState<File | null>(null);
  // const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [blogStatus, setBlogStatus] = useState<'Active' | 'Inactive'>('Active');
  const [publishDate, setPublishDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing blog if editing
  useEffect(() => {
    if (isEditMode && id) {
      const fetchBlog = async () => {
        try {
          const res = await fetch(`/api/admin/getBlog?id=${id}`);
          const data = await res.json();
          if (data.success && data.data) {
            const blog = data.data;
            setTitle(blog.title || '');
            setSlug(blog.slug || '');
            setCategory(blog.category || '');
            setContent(blog.content || '');
            setCoverImage(blog.coverImage || '');
            setThumbnailImage(blog.thumbnailImage || '');
            setMetaTitle(blog.metaTitle || '');
            setMetaDescription(blog.metaDescription || '');
            setAuthor(blog.author || '');
            setBlogStatus(blog.blogStatus || 'Active');
            setPublishDate(blog.publishDate ? new Date(blog.publishDate) : null);
          }
        } catch (err) {
          console.error('Error fetching blog:', err);
        }
      };
      fetchBlog();
    }
  }, [isEditMode, id]);

  // Handle cover file selection
  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files?.length) return;
  const file = e.target.files[0];
  // setCoverFile(file);

  const reader = new FileReader();
  reader.onload = () => setCoverImage(reader.result as string);
  reader.readAsDataURL(file);
};

  // Handle thumbnail file selection
  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files?.length) return;
  const file = e.target.files[0];
  // setThumbnailFile(file);

  const reader = new FileReader();
  reader.onload = () => setThumbnailImage(reader.result as string);
  reader.readAsDataURL(file);
};

  // Upload both cover and thumbnail together
// const uploadImages = async () => {
//   if (!coverFile && !thumbnailFile) return {};

//   const formData = new FormData();
//   if (coverFile) formData.append('coverImage', coverFile);
//   if (thumbnailFile) formData.append('thumbnailImage', thumbnailFile);

//   const res = await fetch('/api/admin/uploadImage', {
//     method: 'POST',
//     body: formData,
//   });

//   const data = await res.json();

//   if (!res.ok || !data.success) throw new Error(data.message || 'Upload failed');
 
//   return {
//     coverImage: data.urls.coverImage || coverImage,
//     thumbnailImage: data.urls.thumbnailImage || thumbnailImage,
//   };
// };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  try {
    const payload = {
      title,
      slug,
      category,
      content,
      coverImage,        // already Base64
      thumbnailImage,    // already Base64
      metaTitle,
      metaDescription,
      author,
      blogStatus,
      publishDate: publishDate?.toISOString() || '',
    };

    console.log('Submitting payload:', payload);

    const url = isEditMode ? '/api/admin/editBlog' : '/api/admin/addBlog';
    const method = isEditMode ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isEditMode ? { id, ...payload } : payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `Failed: ${res.status}`);

    alert(isEditMode ? 'Blog updated successfully!' : 'Blog added successfully!');
    router.push('/blog');
  } catch (err) {
    console.error(err);
    alert('Something went wrong!');
  } finally {
    setLoading(false);
  }
};


  const goBack = () => router.back();

  return (
    <div className="page-main-container container mx-auto px-4 py-6">
     
      <div className="d-flex justify-content-between">
              <h5 className="page-header">{isEditMode ? 'Edit' : 'Add'} Blog</h5>
              <button className="btn back-btn" onClick={goBack}>
                <RiArrowLeftSLine /> Back
              </button>
            </div>
    <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-lg-12">
            <label className="form-label" style={{ fontSize: '14px' }}>Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="col-lg-6">
            <label className="form-label" style={{ fontSize: '14px' }}>Slug</label>
            <input
              type="text"
              className="form-control"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>

          <div className="col-lg-6">
            <label className="form-label" style={{ fontSize: '14px' }}>Category</label>
            <input
              type="text"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="col-lg-6">
            <label className="form-label" style={{ fontSize: '14px' }}>Cover Image</label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              className="form-control"
              onChange={handleCoverFileChange}
              required={!coverImage}
            />
            {coverImage && (
              <Image
                src={coverImage}
                alt="Cover Preview"
                className="mt-2 rounded object-cover"
                width={150} height={100}
              />
            )}
          </div>

          <div className="col-lg-6">
            <label className="form-label" style={{ fontSize: '14px' }}>Thumbnail Image</label>
            <input
  type="file"
  name="thumbnailImage"  // ✅ Add this
  accept="image/*"
  className="form-control"
  onChange={handleThumbnailFileChange}
/>
            {thumbnailImage && (
              <Image
                src={thumbnailImage}
                alt="Thumbnail Preview"
                className="mt-2 rounded object-cover"
                width={150} height={100}
              />
            )}
          </div>

          <div className="col-lg-6">
            <label className="form-label" style={{ fontSize: '14px' }}>Meta Title</label>
            <input
              type="text"
              className="form-control"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              required
            />
          </div>

          <div className="col-lg-6">
            <label className="form-label" style={{ fontSize: '14px' }}>Meta Description</label>
            <input
              type="text"
              className="form-control"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              required
            />
          </div>

          <div className="col-lg-6">
            <label className="form-label" style={{ fontSize: '14px' }}>Author</label>
            <input
              type="text"
              className="form-control"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="col-lg-6">
            <label className="form-label" style={{ fontSize: '14px', display:'block' }}>Publish Date</label>
            <div className='wflld'>
              <DatePicker
              selected={publishDate}
              onChange={(date: Date | null) => setPublishDate(date)}
              className="form-control block w-100"
              dateFormat="yyyy-MM-dd"
              required
            />
            </div>
          </div>

          <div className="col-lg-12">
            <label className="form-label" style={{ fontSize: '14px' }}>Status</label>
            <select
              className="form-select"
              value={blogStatus}
              onChange={(e) => setBlogStatus(e.target.value as 'Active' | 'Inactive')}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

        <div className="col-lg-12">
          <label className="form-label" style={{ fontSize: '14px' }}>Content</label>
          <textarea
            className="form-control"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
<div className="col-lg-12">
        <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
          {loading ? (isEditMode ? 'Updating...' : 'Submitting...') : isEditMode ? 'Update' : 'Submit'}
        </button>
        </div>
        </div>
      </form>
            </div>
          </div>
          </div>
        </div>
      
    </div>
  );
};

export default AddBlog;
