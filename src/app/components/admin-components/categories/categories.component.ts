
import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '../../../services/admin/categories.service';
import { NgIconComponent } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private categoriesService: CategoriesService) {}

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
        console.error(err);
      }
    });
  }

  filterCategories(): void {
    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (category.description && category.description.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  addCategory(): void {
    if (!this.newCategoryName.trim()) return;

    this.categoriesService.createCategory(this.newCategoryName.trim()).subscribe({
      next: (newCategory) => {
        this.categories = [newCategory, ...this.categories];
        this.filterCategories();
        this.newCategoryName = '';
        this.isAdding = false;
      },
      error: (err) => {
        console.error('Failed to create category:', err);
      }
    });
  }

  updateCategory(category: Category): void {
    const newName = prompt('Enter new category name:', category.name);
    if (newName && newName !== category.name) {
      this.categoriesService.updateCategory(category._id, newName).subscribe({
        next: (updatedCategory) => {
          const index = this.categories.findIndex(c => c._id === category._id);
          if (index !== -1) {
            this.categories[index] = updatedCategory;
            this.filterCategories();
          }
        },
        error: (err) => {
          console.error('Failed to update category:', err);
        }
      });
    }
  }

  deleteCategory(categoryId: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoriesService.deleteCategory(categoryId).subscribe({
        next: () => {
          this.categories = this.categories.filter(c => c._id !== categoryId);
          this.filterCategories();
        },
        error: (err) => {
          console.error('Failed to delete category:', err);
        }
      });
    }
  }
}