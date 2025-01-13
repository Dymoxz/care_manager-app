// DropdownModal.tsx
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
    Button,
    Dialog,
    Input,
    Text,
    YStack,
    styled,
    Unspaced,
} from 'tamagui';
import { X } from '@tamagui/lucide-icons';

interface DropdownModalProps<T> {
    visible: boolean;
    items: T[];
    onDone: (selectedItems: T[]) => void;
    onClose: () => void;
    screenWidth: number;
    title: string;
    hasSearch: boolean;
    isMultiSelect: boolean;
    getItemKey: (item: T) => string;
    getTextForItem?: (item: T) => string;
}

const ModalContent = styled(YStack, {
    bg: '$background',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    flexGrow: 1,
});

const ItemButton = styled(Button, {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    py: '$2',
    px: '$3',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '$borderColor',
    marginBottom: '$2',
    variants: {
        selected: {
            true: {
                bg: '$primaryLight',
                borderColor: '$primary',
            },
        },
    },
});

const DropdownModal = <T extends Record<string, any>>({ visible, items, onDone, onClose, screenWidth, title, hasSearch, isMultiSelect, getItemKey, getTextForItem }: DropdownModalProps<T>) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState<T[]>([]);

    const filteredItems = items.filter(item => {
        const itemValue = Object.values(item).join(' ').toLowerCase(); // Search across all values
        return itemValue.includes(searchQuery.toLowerCase());
    });

    const handleItemPress = (item: T) => {
        const itemKey = getItemKey(item);

        if (isMultiSelect) {
            const isSelected = selectedItems.some(selectedItem => getItemKey(selectedItem) === itemKey);
            if (isSelected) {
                setSelectedItems(selectedItems.filter(selectedItem => getItemKey(selectedItem) !== itemKey));
            } else {
                setSelectedItems([...selectedItems, item]);
            }
        } else {
            setSelectedItems([item]);
        }
    };

    return (
        <Dialog modal open={visible} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay
                    animation="lazy"
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                    backgroundColor="rgba(0, 0, 0, 0.5)"
                    pointerEvents="box-none"
                />
                <Dialog.Content
                    elevate
                    animation={['quicker', { opacity: { overshootClamping: true } }]}
                    enterStyle={{ y: -20, opacity: 0, scale: 0.9 }}
                    exitStyle={{ y: 10, opacity: 0, scale: 0.95 }}
                    gap="$4"
                    padding="$4"
                    width={screenWidth * 0.9}
                    style={{ maxWidth: screenWidth * 0.9 }}
                >
                    <Dialog.Title fontSize='$8'>{title}</Dialog.Title>
                    {hasSearch && (
                        <Input placeholder="Search..." value={searchQuery} onChangeText={setSearchQuery} mb="$3"/>
                    )}
                    <ScrollView style={{ maxHeight: 300, flexGrow: 1 }} nestedScrollEnabled={true}>
                        {filteredItems.map(item => (
                            <ItemButton
                                key={getItemKey(item)}
                                onPress={() => handleItemPress(item)}
                                selected={selectedItems.some(selectedItem => getItemKey(selectedItem) === getItemKey(item))}
                            >
                                <Text>{getTextForItem ? getTextForItem(item) : Object.values(item).join(' ')}</Text>
                                {selectedItems.some(selectedItem => getItemKey(selectedItem) === getItemKey(item)) && <Text>✓</Text>}
                            </ItemButton>
                        ))}
                    </ScrollView>
                    <Button mt="$4" onPress={() => { onDone(selectedItems); onClose(); }}>
                        Done
                    </Button>
                    <Unspaced>
                        <Dialog.Close asChild>
                            <Button position="absolute" top="$3" right="$3" size="$2" circular icon={X}/>
                        </Dialog.Close>
                    </Unspaced>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
};

export default DropdownModal;