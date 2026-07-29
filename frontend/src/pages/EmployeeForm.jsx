import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Save, User, Briefcase, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, Button, Badge } from '../components/ui';
import apiClient from '../api/apiClient';
import { cn } from '../lib/utils';

const employeeSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  departmentId: z.string().min(1, 'Department is required'),
  status: z.string().default('ACTIVE'),
  profilePhotoUrl: z.string().optional(),
});

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const isEdit = !!id;

  const { data: employeeData, isLoading: employeeLoading } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => apiClient.get(`/employees/${id}`),
    enabled: isEdit,
  });

  const { data: departments } = useQuery({
    queryKey: ['departments'],
    queryFn: () => apiClient.get('/departments'),
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    trigger,
    watch,
    reset 
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: { status: 'ACTIVE' }
  });

  // Reset form when data is loaded
  React.useEffect(() => {
    if (employeeData?.data) {
      reset({
        ...employeeData.data,
        departmentId: employeeData.data.departmentId?.toString()
      });
    }
  }, [employeeData, reset]);

  const mutation = useMutation({
    mutationFn: (data) => isEdit 
      ? apiClient.put(`/employees/${id}`, data)
      : apiClient.post('/employees', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
      alert(`Employee ${isEdit ? 'updated' : 'created'} successfully`);
      navigate('/employees');
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const nextStep = async () => {
    let fields = [];
    if (step === 1) fields = ['firstName', 'lastName', 'email'];
    if (step === 2) fields = ['departmentId', 'status'];
    
    const isValid = await trigger(fields);
    if (isValid) setStep(prev => prev + 1);
  };

  const formData = watch();

  const steps = [
    { title: 'Personal Info', icon: <User size={20} /> },
    { title: 'Job Details', icon: <Briefcase size={20} /> },
    { title: 'Review', icon: <CheckCircle2 size={20} /> },
  ];

  if (isEdit && employeeLoading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/employees')}>
          <ChevronLeft size={20} className="mr-2" />
          Back to List
        </Button>
        <h2 className="text-2xl font-bold">{isEdit ? 'Edit' : 'Add'} Employee</h2>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between px-8 relative">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-card-border -translate-y-1/2 z-0">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        {steps.map((s, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
              step > i + 1 ? "bg-primary border-primary text-white" : 
              step === i + 1 ? "bg-sidebar border-primary text-primary" : 
              "bg-sidebar border-card-border text-muted"
            )}>
              {s.icon}
            </div>
            <p className={cn("text-xs font-medium mt-2", step === i + 1 ? "text-primary" : "text-muted")}>
              {s.title}
            </p>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted">First Name</label>
                    <input {...register('firstName')} className="w-full bg-sidebar border border-card-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary" />
                    {errors.firstName && <p className="text-xs text-danger">{errors.firstName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted">Last Name</label>
                    <input {...register('lastName')} className="w-full bg-sidebar border border-card-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary" />
                    {errors.lastName && <p className="text-xs text-danger">{errors.lastName.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted">Email Address</label>
                  <input {...register('email')} className="w-full bg-sidebar border border-card-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary" />
                  {errors.email && <p className="text-xs text-danger">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted">Profile Photo URL (Optional)</label>
                  <input {...register('profilePhotoUrl')} placeholder="https://example.com/photo.jpg" className="w-full bg-sidebar border border-card-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary" />
                  {errors.profilePhotoUrl && <p className="text-xs text-danger">{errors.profilePhotoUrl.message}</p>}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted">Department</label>
                  <select {...register('departmentId')} className="w-full bg-sidebar border border-card-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary">
                    <option value="">Select Department</option>
                    {departments?.data?.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                  {errors.departmentId && <p className="text-xs text-danger">{errors.departmentId.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted">Status</label>
                  <select {...register('status')} className="w-full bg-sidebar border border-card-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary">
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="ON_LEAVE">On Leave</option>
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="bg-white/5 rounded-xl p-6 border border-card-border divide-y divide-card-border">
                  <div className="pb-4 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted uppercase font-bold tracking-wider">Employee</p>
                      <p className="text-lg font-semibold">{formData.firstName} {formData.lastName}</p>
                      <p className="text-sm text-muted">{formData.email}</p>
                    </div>
                  </div>
                  <div className="py-4 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted uppercase font-bold tracking-wider">Placement</p>
                      <p className="text-md font-medium text-primary">
                        {departments?.data?.find(d => d.id.toString() === formData.departmentId)?.name || 'N/A'}
                      </p>
                    </div>
                    <Badge variant={formData.status === 'ACTIVE' ? 'success' : 'default'}>{formData.status}</Badge>
                  </div>
                </div>
                <p className="text-xs text-muted italic text-center">Please review all information carefully before submitting.</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-card-border">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => setStep(prev => prev - 1)}
                className={cn(step === 1 && "invisible")}
              >
                <ChevronLeft size={18} className="mr-2" />
                Previous
              </Button>
              
              {step < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Next Step
                  <ChevronRight size={18} className="ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={mutation.isLoading}>
                  <Save size={18} className="mr-2" />
                  {isEdit ? 'Update' : 'Create'} Employee
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeForm;
