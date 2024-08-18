import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import React from 'react';

function History() {
    const { toast } = useToast();

    const handleCopy = (tag) => {
        navigator.clipboard.writeText(tag.value)
            .then(() => {
                toast({
                    title: "Link Copied",
                    description: `Original Link: ${tag.key}`,
                });
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
                toast({
                    title: "Error",
                    description: "Failed to copy link",
                    variant: "destructive",
                });
            });
    };

    const tags = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        tags.push({ key, value });
    }

    return (
        <div className="history-section">
            <ScrollArea className="h-72 w-full rounded-md border">
                <div className="p-4">
                    <h4 className="mb-4 text-3xl font-medium leading-none text-center">History</h4>
                    <h6 className="text-center pb-8">All your previous URLs! Click and get it copied 📓</h6>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/2 text-left">Original URL</TableHead>
                                <TableHead className="w-1/2 text-left">Shortened URL</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tags.map((tag, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        <a href={tag.value} target="_blank" rel="noopener noreferrer"><strong>{tag.key}</strong></a>
                                    </TableCell>
                                    <TableCell
                                        className="text-left cursor-pointer text-blue-800"
                                        onClick={() => handleCopy(tag)} 
                                    >
                                        {tag.value}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </ScrollArea>
            <Toaster />  {/* I was missing this to add this resulted in components not mounded... */}
        </div>
    );
}

export default History;