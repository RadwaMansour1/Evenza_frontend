import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '../../../services/admin/categories.service';
import { NgIconComponent } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, NgIconComponent, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchTerm: string = '';
  isLoading = true;
  error: string | null = null;
  newCategoryName = '';
  isAdding = false;

  // Modals
  isEditModalOpen = false;
  isDeleteModalOpen = false;
  selectedCategory: Category | null = null;
  editCategoryName = '';

  constructor(
    private categoriesService: CategoriesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.filteredCategories = [...categories];
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load categories';
        this.isLoading = false;
        this.toastr.error('Failed to load categories', 'Error');
        console.error(err);
      }
    });
  }

  // Edit Modal Handlers
  openEditModal(category: Category): void {
    this.selectedCategory = category;
    this.editCategoryName = category.name;
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedCategory = null;
    this.editCategoryName = '';
  }

  updateCategory(): void {
    if (!this.selectedCategory || !this.editCategoryName.trim()) return;

    this.categoriesService.updateCategory(
      this.selectedCategory._id, 
      this.editCategoryName.trim()
    ).subscribe({
      next: (updatedCategory) => {
        const index = this.categories.findIndex(c => c._id === this.selectedCategory?._id);
        if (index !== -1) {
          this.categories[index] = updatedCategory;
          this.filterCategories();
          this.toastr.success('Category updated successfully', 'Success');
        }
        this.closeEditModal();
      },
      error: (err) => {
        this.toastr.error('Failed to update category', 'Error');
        console.error('Failed to update category:', err);
      }
    });
  }

  // Delete Modal Handlers
  openDeleteModal(category: Category): void {
    this.selectedCategory = category;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.selectedCategory = null;
  }

  confirmDelete(): void {
    if (!this.selectedCategory) return;

    this.categoriesService.deleteCategory(this.selectedCategory._id).subscribe({
      next: () => {
        this.categories = this.categories.filter(c => c._id !== this.selectedCategory?._id);
        this.filterCategories();
        this.toastr.success('Category deleted successfully', 'Success');
        this.closeDeleteModal();
      },
      error: (err) => {
        this.toastr.error('Failed to delete category', 'Error');
        console.error('Failed to delete category:', err);
      }
    });
  }

  // Rest of your existing methods...
  filterCategories(): void { /* ... */ }
  addCategory(): void { /* ... */ }
}