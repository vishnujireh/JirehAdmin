import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RiArrowLeftSLine } from 'react-icons/ri';

interface JobType {
  _id?: string;
  job_id?: string;
  title: string;
  location: string;
  jobType: string;
  experience: string;
  salary: string;
  skills: string[];
  description: string;
  jobStatus: 'Active' | 'Inactive';
}

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [experience, setExperience] = useState('');
  const [salary, setSalary] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [jobStatus, setJobStatus] = useState<'Active' | 'Inactive'>('Active');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const isEditMode = Boolean(id);

  // ✅ Fetch existing job details if editing
  useEffect(() => {
    if (isEditMode && id) {
      const fetchJob = async () => {
        try {
          const response = await fetch(`/api/admin/getJob?id=${id}`);
          const data = await response.json();
          if (data.success && data.data) {
            const job = data.data;
            setTitle(job.title || '');
            setLocation(job.location || '');
            setJobType(job.jobType || '');
            setExperience(job.experience || '');
            setSalary(job.salary || '');
            setSkills(Array.isArray(job.skills) ? job.skills : []);
            setDescription(job.description || '');
            setJobStatus(job.jobStatus || 'Active');
          }
        } catch (error) {
          console.error('Error fetching job:', error);
        }
      };
      fetchJob();
    }
  }, [isEditMode, id]);

  // ✅ Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title,
        location,
        jobType,
        experience,
        salary,
        skills,
        description,
        jobStatus,
      };

      const url = isEditMode
        ? '/api/admin/UpdateJob'
        : '/api/admin/addJob';

      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Failed: ${res.status}`);

      const data = await res.json();
      console.log('✅ Success:', data);

      alert(isEditMode ? 'Job updated successfully!' : 'Job added successfully!');
      router.push('/jobmanagement');
    } catch (err) {
      console.error('❌ Error saving job:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => router.back();

  // ✅ Convert comma-separated input into skill array
  const handleSkillsChange = (value: string) => {
    const skillArray = value.split(',').map((s) => s.trim()).filter((s) => s);
    setSkills(skillArray);
  };

  return (
    <div className="page-main-container">
      <div className="d-flex justify-content-between">
        <h5 className="page-header">{isEditMode ? 'Edit Job' : 'Add Job'}</h5>
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

                  {/* Job Title */}
                  <div className="col-lg-4">
                    <label className="form-label" style={{ fontSize: '14px' }}>Job Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  {/* Location */}
                  <div className="col-lg-4">
                    <label className="form-label" style={{ fontSize: '14px' }}>Location</label>
                    <input
                      type="text"
                      className="form-control"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>

                  {/* Job Type */}
                  <div className="col-lg-4">
                    <label className="form-label" style={{ fontSize: '14px' }}>Job Type</label>
                    <select
                      className="form-select text-dark"
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      required
                    >
                      <option value="">Select Job Type</option>
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Internship</option>
                      <option>Contract</option>
                    </select>
                  </div>

                  {/* Experience */}
                  <div className="col-lg-4">
                    <label className="form-label" style={{ fontSize: '14px' }}>Experience</label>
                    <input
                      type="text"
                      className="form-control"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="e.g., 3-5 years"
                      required
                    />
                  </div>

                  {/* Salary */}
                  <div className="col-lg-4">
                    <label className="form-label" style={{ fontSize: '14px' }}>Salary</label>
                    <input
                      type="text"
                      className="form-control"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="e.g., ₹25,000 - ₹40,000"
                      required
                    />
                  </div>

                  {/* Skills */}
                  <div className="col-lg-4">
                    <label className="form-label" style={{ fontSize: '14px' }}>Skills (comma separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={skills.join(', ')}
                      onChange={(e) => handleSkillsChange(e.target.value)}
                      placeholder="e.g., SEO, Google Analytics, Content Strategy"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="col-lg-12">
                    <label className="form-label" style={{ fontSize: '14px' }}>Description</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  {/* Job Status */}
                  <div className="col-lg-4">
                    <label className="form-label" style={{ fontSize: '14px' }}>Status</label>
                    <select
                      className="form-select text-dark"
                      value={jobStatus}
                      onChange={(e) => setJobStatus(e.target.value as 'Active' | 'Inactive')}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="col-12 text-start mt-3">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading
                        ? isEditMode
                          ? 'Updating...'
                          : 'Submitting...'
                        : isEditMode
                        ? 'Update Job'
                        : 'Submit Job'}
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

export default AddJob;
