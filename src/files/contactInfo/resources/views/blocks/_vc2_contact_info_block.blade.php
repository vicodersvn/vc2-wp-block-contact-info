<?php
// Create id attribute allowing for custom "anchor" value.
		$id = 'contact-info-block-' . $block['id'];
		if( !empty($block['anchor']) ) {
		    $id = $block['anchor'];
		}

		// Create class attribute allowing for custom "className" and "align" values.
		$className = 'contact-info-block';
		if( !empty($block['className']) ) {
		    $className .= ' ' . $block['className'];
		}
		if( !empty($block['align']) ) {
		    $className .= ' align' . $block['align'];
		}
		if( $is_preview ) {
		    $className .= ' is-admin';
		}

		$title = get_field('title');
		$map = get_field('map');

		?>
		<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?>">
			<div class="bg-image" style="background-color: <?php echo $contact_background_color; ?>"></div>
			<div class="row">
				<div class="col-lg-6 col-md-12 ">
					<h3 class="title"><?php echo $title; ?></h3>
					@if( have_rows('list_features') )
						<ul class="list-info">
							<?php while( have_rows('list_features') ): the_row();
								$feature = get_sub_field('feature');
							?>
								<li>{{ $feature }}</li>
							<?php endwhile; ?>
						</ul>
					@endif
				</div>
				<div class="col-lg-6 col-md-12">
					<div class="contact-map">
						{!! $map !!}
					</div>
				</div>
			</div>
		</div>
<?php     