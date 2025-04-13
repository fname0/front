import React from 'react';

function UserDetail({ user, onBack, onEdit }) {
  return (
    <div className="user-detail">
      <h2>User Details</h2>
      <div className="detail-content">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
      </div>
      <div className="detail-actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onBack}>Back to List</button>
      </div>
    </div>
  );
}

export default UserDetail;