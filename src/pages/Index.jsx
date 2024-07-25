import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Rocket, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Index = () => {
  const [deployments, setDeployments] = useState([]);
  const [newDeployment, setNewDeployment] = useState({
    name: '',
    environment: 'production',
    status: 'pending'
  });

  useEffect(() => {
    // Simulating fetching initial data
    const initialDeployments = [
      { id: 1, name: 'v1.0.0', environment: 'production', status: 'success', date: '2023-06-01' },
      { id: 2, name: 'v1.1.0', environment: 'staging', status: 'failed', date: '2023-06-15' },
      { id: 3, name: 'v1.2.0', environment: 'development', status: 'pending', date: '2023-06-30' },
    ];
    setDeployments(initialDeployments);
  }, []);

  const handleInputChange = (e) => {
    setNewDeployment({ ...newDeployment, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setNewDeployment({ ...newDeployment, [name]: value });
  };

  const addDeployment = () => {
    const deployment = {
      ...newDeployment,
      id: deployments.length + 1,
      date: new Date().toISOString().split('T')[0]
    };
    setDeployments([...deployments, deployment]);
    setNewDeployment({ name: '', environment: 'production', status: 'pending' });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle className="text-green-500" />;
      case 'failed': return <XCircle className="text-red-500" />;
      case 'pending': return <AlertCircle className="text-yellow-500" />;
      default: return null;
    }
  };

  const chartData = ['production', 'staging', 'development'].map(env => ({
    name: env,
    deployments: deployments.filter(d => d.environment === env).length
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Deployment Tracker</h1>

      <Card className="mb-6">
        <CardHeader>Add New Deployment</CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              name="name"
              placeholder="Deployment Name"
              value={newDeployment.name}
              onChange={handleInputChange}
              className="flex-grow"
            />
            <Select name="environment" onValueChange={(value) => handleSelectChange('environment', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="development">Development</SelectItem>
              </SelectContent>
            </Select>
            <Select name="status" onValueChange={(value) => handleSelectChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addDeployment}>Add Deployment</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>Deployment List</CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Environment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deployments.map((deployment) => (
                  <TableRow key={deployment.id}>
                    <TableCell>{deployment.name}</TableCell>
                    <TableCell>{deployment.environment}</TableCell>
                    <TableCell className="flex items-center">
                      {getStatusIcon(deployment.status)}
                      <span className="ml-2">{deployment.status}</span>
                    </TableCell>
                    <TableCell>{deployment.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>Deployments by Environment</CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="deployments" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;