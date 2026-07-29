import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Building2, Users, MoreVertical, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../components/ui';
import apiClient from '../api/apiClient';

const Departments = () => {
  const navigate = useNavigate();
  const { data: response, isLoading } = useQuery({
    queryKey: ['departments'],
    queryFn: () => apiClient.get('/departments'),
  });

  const departments = response?.data || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Departments</h2>
          <p className="text-muted">Manage company organizational units.</p>
        </div>
        <Button>
          <Plus size={18} className="mr-2" />
          Add Department
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse h-40"></Card>
          ))
        ) : departments.map((dept) => (
          <Card key={dept.id} className="hover:border-primary/50 transition-colors group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Building2 size={24} />
                </div>
                <button className="text-muted hover:text-white">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold">{dept.name}</h3>
                <div className="flex items-center text-muted text-sm mt-1">
                  <Users size={16} className="mr-2" />
                  {dept.employeeCount} Employees
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <Badge variant="info">Active</Badge>
                <button onClick={() => navigate(`/employees?departmentId=${dept.id}`)} className="text-xs text-primary font-medium hover:underline">View Members</button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Departments;
