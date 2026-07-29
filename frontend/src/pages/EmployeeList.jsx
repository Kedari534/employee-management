import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  UserCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Trash
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, Button, Badge } from '../components/ui';
import apiClient from '../api/apiClient';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState('');
  const [departmentId, setDepartmentId] = useState(searchParams.get('departmentId') || '');
  const [status, setStatus] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Fetch all Employees for client-side processing
  const { data: response, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: () => apiClient.get('/employees'),
  });

  const { data: departments } = useQuery({
    queryKey: ['departments'],
    queryFn: () => apiClient.get('/departments'),
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => apiClient.delete(`/employees/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
      alert('Employee deleted successfully');
    }
  });

  // Bulk Delete Mutation
  const bulkDeleteMutation = useMutation({
    mutationFn: (ids) => apiClient.post('/employees/bulk-delete', ids),
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
      setSelectedEmployees([]);
      alert('Selected employees deleted successfully');
    }
  });

  // Client-side filtering and pagination
  let allEmployees = Array.isArray(response?.data) ? response.data : (response?.data?.content || []);
  
  if (search) {
    const s = search.toLowerCase();
    allEmployees = allEmployees.filter(e => 
      e.firstName?.toLowerCase().includes(s) || 
      e.lastName?.toLowerCase().includes(s) ||
      e.email?.toLowerCase().includes(s)
    );
  }
  
  if (departmentId) {
    allEmployees = allEmployees.filter(e => e.departmentId?.toString() === departmentId.toString());
  }
  
  if (status) {
    allEmployees = allEmployees.filter(e => e.status === status);
  }

  const totalElements = allEmployees.length;
  const totalPages = Math.max(1, Math.ceil(totalElements / size));
  
  // Enforce page bounds
  const currentPage = Math.min(page, Math.max(0, totalPages - 1));
  const employees = allEmployees.slice(currentPage * size, (currentPage + 1) * size);

  const toggleSelect = (id) => {
    setSelectedEmployees(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedEmployees.length === employees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employees.map(e => e.id));
    }
  };

  const handleExport = async () => {
    const res = await apiClient.get('/employees/export', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([res]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'employees.csv');
    document.body.appendChild(link);
    link.click();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE': return <Badge variant="success">Active</Badge>;
      case 'INACTIVE': return <Badge variant="danger">Inactive</Badge>;
      case 'ON_LEAVE': return <Badge variant="warning">On Leave</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Employees</h2>
          <p className="text-muted">Manage your workforce efficiently.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={handleExport}>
            <Download size={18} className="mr-2" />
            Export
          </Button>
          <Button onClick={() => navigate('/employees/add')}>
            <Plus size={18} className="mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="w-full bg-sidebar/50 border border-card-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select 
              className="bg-sidebar border border-card-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments?.data?.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <select 
              className="bg-sidebar border border-card-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="ON_LEAVE">On Leave</option>
            </select>
          </div>

          {selectedEmployees.length > 0 && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-primary">
                {selectedEmployees.length} employees selected
              </span>
              <Button variant="danger" size="sm" onClick={() => bulkDeleteMutation.mutate(selectedEmployees)}>
                <Trash size={16} className="mr-2" />
                Delete Selected
              </Button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-card-border">
                  <th className="py-4 px-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-card-border bg-sidebar text-primary focus:ring-primary"
                      checked={selectedEmployees.length === employees.length && employees.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="py-4 px-4 text-sm font-medium text-muted uppercase tracking-wider">Employee</th>
                  <th className="py-4 px-4 text-sm font-medium text-muted uppercase tracking-wider">Department</th>
                  <th className="py-4 px-4 text-sm font-medium text-muted uppercase tracking-wider">Status</th>
                  <th className="py-4 px-4 text-sm font-medium text-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="py-6 px-4 bg-white/5 rounded-lg mb-2"></td>
                    </tr>
                  ))
                ) : employees.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-muted">
                      No employees found.
                    </td>
                  </tr>
                ) : (
                  employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4">
                        <input 
                          type="checkbox" 
                          className="rounded border-card-border bg-sidebar text-primary focus:ring-primary"
                          checked={selectedEmployees.includes(employee.id)}
                          onChange={() => toggleSelect(employee.id)}
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-sidebar flex items-center justify-center text-primary border border-card-border mr-3">
                            {employee.profilePhotoUrl ? (
                              <img src={employee.profilePhotoUrl} alt="" className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <UserCircle2 size={24} />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{employee.firstName} {employee.lastName}</p>
                            <p className="text-xs text-muted">{employee.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm">
                        {employee.departmentName || 'N/A'}
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(employee.status)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => navigate(`/employees/edit/${employee.id}`)}
                            className="p-2 hover:bg-white/10 rounded-lg text-muted hover:text-white transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => deleteMutation.mutate(employee.id)}
                            className="p-2 hover:bg-danger/10 rounded-lg text-muted hover:text-danger transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-xs text-muted">
              Page {page + 1} of {totalPages}
            </p>
            <div className="flex items-center space-x-2">
              <Button 
                variant="secondary" 
                size="sm" 
                disabled={currentPage === 0}
                onClick={() => setPage(prev => Math.max(0, prev - 1))}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                disabled={currentPage >= totalPages - 1}
                onClick={() => setPage(prev => Math.min(totalPages - 1, prev + 1))}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeList;
