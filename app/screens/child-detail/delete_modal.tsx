// DeleteModal.js
import { Dialog, DialogContent, DialogTitle, DialogClose, } from '@tamagui/dialog';
import {Button, Paragraph, YStack} from 'tamagui';

export const DeleteModal = ({ open, setOpen }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <YStack space="$4" padding="$6">
                    <DialogTitle fontSize="$2">Confirmation</DialogTitle>
                    <Paragraph>Are you sure you want to perform this action?</Paragraph>
                    <YStack space="$3" flexDirection="row" justifyContent="flex-end">
                        <DialogClose asChild>
                            <Button color="$red7">Cancel</Button>
                        </DialogClose>
                        <Button backgroundColor="$green7">Confirm</Button>
                    </YStack>
                </YStack>
            </DialogContent>
        </Dialog>
    );
};