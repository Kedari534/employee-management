import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Mail, Briefcase, Calendar, MapPin, Edit, History, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../components/ui';
import apiClient from '../api/apiClient';

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: response, isLoading } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => apiClient.get(`/employees/${id}`),
  });

  const employee = response?.data;

  if (isLoading) return <div className="text-center py-20">Loading profile...</div>;
  if (!employee) return <div className="text-center py-20 text-danger">Employee not found</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center text-white text-3xl font-bold shadow-2xl shadow-primary/20">
            {employee.firstName[0]}{employee.lastName[0]}
          </div>
          <div>
            <h2 className="text-3xl font-bold">{employee.firstName} {employee.lastName}</h2>
            <div className="flex items-center space-x-4 mt-2">
              <Badge variant={employee.status === 'ACTIVE' ? 'success' : 'default'}>{employee.status}</Badge>
              <span className="text-muted flex items-center text-sm">
                <Briefcase size={16} className="mr-1" />
                {employee.departmentName || 'No Department'}
              </span>
            </div>
          </div>
        </div>
        <Button onClick={() => navigate(`/employees/edit/${id}`)}>
          <Edit size={18} className="mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Professional Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs text-muted uppercase font-bold">Email Address</p>
                <p className="flex items-center font-medium">
                  <Mail size={16} className="mr-2 text-primary" />
                  {employee.email}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted uppercase font-bold">Joining Date</p>
                <p className="flex items-center font-medium">
                  <Calendar size={16} className="mr-2 text-primary" />
                  {new Date().toLocaleDateString()} {/* Mock date */}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted uppercase font-bold">Office Location</p>
                <p className="flex items-center font-medium">
                  <MapPin size={16} className="mr-2 text-primary" />
                  Remote / Global
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center space-x-4 border-b border-card-border pb-px">
            <button className="px-4 py-2 border-b-2 border-primary text-primary font-medium">Activity</button>
            <button className="px-4 py-2 text-muted hover:text-white transition-colors">Documents</button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="p-2 rounded-lg bg-white/5 text-muted group-hover:text-primary transition-colors">
                  <History size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">Profile updated by Admin</p>
                  <p className="text-xs text-muted mt-1">2 hours ago • Database Sync</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Contract.pdf', 'Resume.pdf', 'ID_Proof.jpg'].map(doc => (
                <div key={doc} className="flex items-center justify-between p-3 rounded-lg border border-card-border hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <FileText size={18} className="mr-3 text-muted" />
                    <span className="text-sm font-medium">{doc}</span>
                  </div>
                  <Badge>PDF</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
