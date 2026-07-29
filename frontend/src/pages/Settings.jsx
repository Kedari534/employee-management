import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, User, Database, Palette } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../components/ui';

const Settings = () => {
  const sections = [
    { title: 'General', icon: <SettingsIcon size={18} />, desc: 'Application-wide configurations and metadata.' },
    { title: 'Account', icon: <User size={18} />, desc: 'Manage your profile and personal preferences.' },
    { title: 'Notifications', icon: <Bell size={18} />, desc: 'Control how you receive system alerts.' },
    { title: 'Security', icon: <Shield size={18} />, desc: 'Manage passwords and authentication methods.' },
    { title: 'Database', icon: <Database size={18} />, desc: 'Backup, restore and maintenance tasks.' },
    { title: 'Appearance', icon: <Palette size={18} />, desc: 'Customize themes and dashboard layout.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted">Configure the system to your needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map(section => (
          <Card 
            key={section.title} 
            className="hover:bg-white/5 cursor-pointer transition-colors group"
            onClick={() => alert(`Settings for ${section.title} are currently under development.`)}
          >
            <CardContent className="p-6 flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-sidebar border border-card-border group-hover:border-primary/50 transition-colors">
                {section.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{section.title}</h3>
                <p className="text-sm text-muted mt-1">{section.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Maintenance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-card-border">
            <div>
              <p className="font-medium text-white">Full Backup</p>
              <p className="text-sm text-muted">Last backup: 2 days ago</p>
            </div>
            <Button variant="secondary" onClick={() => alert('Running full backup... (Mock Action)')}>Run Backup</Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-danger/5 rounded-xl border border-danger/20">
            <div>
              <p className="font-medium text-danger">Reset System</p>
              <p className="text-sm text-muted">Deletes all transient data and logs.</p>
            </div>
            <Button variant="danger" onClick={() => alert('Are you sure? Factory reset is not currently implemented.')}>Factory Reset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
