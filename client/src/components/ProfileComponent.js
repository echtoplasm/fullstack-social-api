// Use this as an example moving forward of state and effect 

//state enables rendered dat a on the page to be stateful 

//effect enables data rendered on the page to interact with an external source such as the API


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProfileComponent = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states for editing
  const [editForm, setEditForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    locale: '',
    phone_number: '',
    biography: ''
  });

  const { id } = useParams();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${id}`);
        const userData = await response.json();

        if (response.ok) {
          setUserInfo(userData);
          // Populate edit form with current data
          setEditForm({
            username: userData.username || '',
            first_name: userData.first_name || '',
            last_name: userData.last_name || '',
            email: userData.email || '',
            locale: userData.locale || '',
            phone_number: userData.phone_number || '',
            biography: userData.biography || ''
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  // Handle update submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });

      const data = await response.json();
      console.log('Update response data:', data)
      
      if (response.ok) {
        setUserInfo(data); // Change from data.user to just data
        setIsEditing(false);
        setSuccess('Profile updated successfully!');
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Network error. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    // Reset form to original values
    setEditForm({
      username: userInfo.username || '',
      first_name: userInfo.first_name || '',
      last_name: userInfo.last_name || '',
      email: userInfo.email || '',
      locale: userInfo.locale || '',
      phone_number: userInfo.phone_number || '',
      biography: userInfo.biography || ''
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {!isEditing ? (
            // Display Mode
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2>Profile</h2>
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-sm-3"><strong>Username:</strong></div>
                  <div className="col-sm-9">{userInfo?.username}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3"><strong>Name:</strong></div>
                  <div className="col-sm-9">{userInfo?.first_name} {userInfo?.last_name}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3"><strong>Email:</strong></div>
                  <div className="col-sm-9">{userInfo?.email}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3"><strong>Locale:</strong></div>
                  <div className="col-sm-9">{userInfo?.locale}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3"><strong>Phone:</strong></div>
                  <div className="col-sm-9">{userInfo?.phone_number}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3"><strong>Biography:</strong></div>
                  <div className="col-sm-9">{userInfo?.biography}</div>
                </div>
              </div>
            </div>
          ) : (
            // Edit Mode
            <div className="card">
              <div className="card-header">
                <h2>Edit Profile</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleUpdateSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={editForm.username}
                      onChange={handleInputChange}
                      required
                    />
                    <label>Username</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      value={editForm.first_name}
                      onChange={handleInputChange}
                      required
                    />
                    <label>First Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      value={editForm.last_name}
                      onChange={handleInputChange}
                      required
                    />
                    <label>Last Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      required
                    />
                    <label>Email</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      type="text"
                      name="locale"
                      placeholder="Locale"
                      value={editForm.locale}
                      onChange={handleInputChange}
                    />
                    <label>Locale</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      type="tel"
                      name="phone_number"
                      placeholder="Phone Number"
                      value={editForm.phone_number}
                      onChange={handleInputChange}
                    />
                    <label>Phone Number</label>
                  </div>

                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      name="biography"
                      placeholder="Biography"
                      value={editForm.biography}
                      onChange={handleInputChange}
                      style={{ height: '100px' }}
                    />
                    <label>Biography</label>
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={updating}
                    >
                      {updating ? 'Updating...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancelEdit}
                      disabled={updating}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
