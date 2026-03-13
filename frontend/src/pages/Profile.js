// src/pages/Profile.js
import React, { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const initials = useMemo(() => {
    const fn = user?.firstName || '';
    const ln = user?.lastName || '';
    const n = `${fn} ${ln}`.trim() || user?.email || 'User';
    return n
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(s => s[0]?.toUpperCase())
      .join('');
  }, [user]);

  return (
    <div className="profile-page">
      <div className="profile-header card">
        <div className="avatar">
          {user?.avatar?.url ? (
            <img src={user.avatar.url} alt="Profile" />
          ) : (
            <div className="avatar-fallback">{initials}</div>
          )}
        </div>
        <div className="header-info">
          <h1>{user?.firstName || 'Guest'} {user?.lastName || ''}</h1>
          <p>{user?.email || 'Not logged in'}</p>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>Profile</button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Orders</button>
          <button className={activeTab === 'addresses' ? 'active' : ''} onClick={() => setActiveTab('addresses')}>Addresses</button>
          <button className={activeTab === 'wishlist' ? 'active' : ''} onClick={() => setActiveTab('wishlist')}>Wishlist</button>
        </div>

        <div className="profile-main">
          {activeTab === 'profile' && (
            <div className="profile-info">
              <h2>Personal Information</h2>
              <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-field">
                    <label>First Name</label>
                    <input type="text" defaultValue={user?.firstName || ''} />
                  </div>
                  <div className="form-field">
                    <label>Last Name</label>
                    <input type="text" defaultValue={user?.lastName || ''} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Email</label>
                    <input type="email" defaultValue={user?.email || ''} disabled />
                  </div>
                  <div className="form-field">
                    <label>Phone</label>
                    <input type="tel" defaultValue={user?.phone || ''} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Gender</label>
                    <select defaultValue={user?.gender || ''}>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn primary">Save Changes</button>
                  <button type="button" className="btn">Cancel</button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="orders-history">
              <h2>Order History</h2>
              <p>No orders yet.</p>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="addresses">
              <h2>Saved Addresses</h2>
              <p>No addresses added.</p>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="wishlist">
              <h2>Wishlist</h2>
              <p>Your wishlist is empty.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;